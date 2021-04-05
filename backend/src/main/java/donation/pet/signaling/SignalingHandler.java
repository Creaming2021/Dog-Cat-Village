package donation.pet.signaling;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.kurento.client.*;
import org.kurento.jsonrpc.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class SignalingHandler extends TextWebSocketHandler {

    private static final Gson gson = new GsonBuilder().create();

    private final ConcurrentHashMap<String, UserSession> viewers = new ConcurrentHashMap<>();

    @Autowired
    private KurentoClient kurento;

    private MediaPipeline pipeline;
    private UserSession presenterUserSession;

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);
        log.debug("Incoming message from session '{}': {}", session.getId(), jsonMessage);

        switch (jsonMessage.get("id").getAsString()) {
            case "presenter":
                try {
                    presenter(session, jsonMessage);
                } catch (Throwable t) {
                    handleErrorResponse(t, session, "presenterResponse");
                }
                break;
            case "viewer":
                try {
                    viewer(session, jsonMessage);
                } catch (Throwable t) {
                    handleErrorResponse(t, session, "viewerResponse");
                }
                break;
            case "onIceCandidate": {
                JsonObject candidate = jsonMessage.get("candidate").getAsJsonObject();

                UserSession user = null;
                if (presenterUserSession != null) {
                    if (presenterUserSession.getSession() == session) {
                        user = presenterUserSession;
                    } else {
                        user = viewers.get(session.getId());
                    }
                }
                if (user != null) {
                    IceCandidate cand =
                            new IceCandidate(candidate.get("candidate").getAsString(), candidate.get("sdpMid")
                                    .getAsString(), candidate.get("sdpMLineIndex").getAsInt());
                    user.addCandidate(cand);
                }
                break;
            }
            case "stop":
                stop(session);
                break;
            default:
                break;
        }
    }

    private void handleErrorResponse(Throwable throwable, WebSocketSession session, String responseId)
            throws IOException {
        stop(session);
        log.error(throwable.getMessage(), throwable);
        JsonObject response = new JsonObject();
        response.addProperty("id", responseId);
        response.addProperty("response", "rejected");
        response.addProperty("message", throwable.getMessage());
        session.sendMessage(new TextMessage(response.toString()));
    }

    private synchronized void presenter(final WebSocketSession session, JsonObject jsonMessage)
            throws IOException {
        if (presenterUserSession == null) {
            presenterUserSession = new UserSession(session);

            pipeline = kurento.createMediaPipeline();
            presenterUserSession.setWebRtcEndpoint(new WebRtcEndpoint.Builder(pipeline).build());

            WebRtcEndpoint presenterWebRtc = presenterUserSession.getWebRtcEndpoint();

            presenterWebRtc.addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {

                @Override
                public void onEvent(IceCandidateFoundEvent event) {
                    JsonObject response = new JsonObject();
                    response.addProperty("id", "iceCandidate");
                    response.add("candidate", JsonUtils.toJsonObject(event.getCandidate()));
                    try {
                        synchronized (session) {
                            session.sendMessage(new TextMessage(response.toString()));
                        }
                    } catch (IOException e) {
                        log.debug(e.getMessage());
                    }
                }
            });

            String sdpOffer = jsonMessage.getAsJsonPrimitive("sdpOffer").getAsString();
            String sdpAnswer = presenterWebRtc.processOffer(sdpOffer);

            JsonObject response = new JsonObject();
            response.addProperty("id", "presenterResponse");
            response.addProperty("response", "accepted");
            response.addProperty("sdpAnswer", sdpAnswer);

            synchronized (session) {
                presenterUserSession.sendMessage(response);
            }
            presenterWebRtc.gatherCandidates();

        } else {
            JsonObject response = new JsonObject();
            response.addProperty("id", "presenterResponse");
            response.addProperty("response", "rejected");
            response.addProperty("message",
                    "Another user is currently acting as sender. Try again later ...");
            session.sendMessage(new TextMessage(response.toString()));
        }
    }

    private synchronized void viewer(final WebSocketSession session, JsonObject jsonMessage)
            throws IOException {
        if (presenterUserSession == null || presenterUserSession.getWebRtcEndpoint() == null) {
            JsonObject response = new JsonObject();
            response.addProperty("id", "viewerResponse");
            response.addProperty("response", "rejected");
            response.addProperty("message",
                    "No active sender now. Become sender or . Try again later ...");
            session.sendMessage(new TextMessage(response.toString()));
        } else {
            if (viewers.containsKey(session.getId())) {
                JsonObject response = new JsonObject();
                response.addProperty("id", "viewerResponse");
                response.addProperty("response", "rejected");
                response.addProperty("message", "You are already viewing in this session. "
                        + "Use a different browser to add additional viewers.");
                session.sendMessage(new TextMessage(response.toString()));
                return;
            }
            UserSession viewer = new UserSession(session);
            viewers.put(session.getId(), viewer);

            WebRtcEndpoint nextWebRtc = new WebRtcEndpoint.Builder(pipeline).build();

            nextWebRtc.addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {

                @Override
                public void onEvent(IceCandidateFoundEvent event) {
                    JsonObject response = new JsonObject();
                    response.addProperty("id", "iceCandidate");
                    response.add("candidate", JsonUtils.toJsonObject(event.getCandidate()));
                    try {
                        synchronized (session) {
                            session.sendMessage(new TextMessage(response.toString()));
                        }
                    } catch (IOException e) {
                        log.debug(e.getMessage());
                    }
                }
            });

            viewer.setWebRtcEndpoint(nextWebRtc);
            presenterUserSession.getWebRtcEndpoint().connect(nextWebRtc);
            String sdpOffer = jsonMessage.getAsJsonPrimitive("sdpOffer").getAsString();
            String sdpAnswer = nextWebRtc.processOffer(sdpOffer);

            JsonObject response = new JsonObject();
            response.addProperty("id", "viewerResponse");
            response.addProperty("response", "accepted");
            response.addProperty("sdpAnswer", sdpAnswer);

            synchronized (session) {
                viewer.sendMessage(response);
            }
            nextWebRtc.gatherCandidates();
        }
    }

    private synchronized void stop(WebSocketSession session) throws IOException {
        String sessionId = session.getId();
        if (presenterUserSession != null && presenterUserSession.getSession().getId().equals(sessionId)) {
            for (UserSession viewer : viewers.values()) {
                JsonObject response = new JsonObject();
                response.addProperty("id", "stopCommunication");
                viewer.sendMessage(response);
            }

            log.info("Releasing media pipeline");
            if (pipeline != null) {
                pipeline.release();
            }
            pipeline = null;
            presenterUserSession = null;
        } else if (viewers.containsKey(sessionId)) {
            if (viewers.get(sessionId).getWebRtcEndpoint() != null) {
                viewers.get(sessionId).getWebRtcEndpoint().release();
            }
            viewers.remove(sessionId);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        stop(session);
    }
}
