package com.pet.signaling;

import com.google.gson.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.kurento.client.*;
import org.kurento.jsonrpc.JsonUtils;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Data
@Slf4j
public class Room {

    private UserSession shelterSession;
    private MediaPipeline pipeline;

    // <consumerId, consumerSession>
    private ConcurrentHashMap<Long, UserSession> consumers = new ConcurrentHashMap<>();

    public Room(WebSocketSession session, Long shelterId, JsonObject jsonMessage, MediaPipeline mediaPipeline)
            throws IOException {
        shelterSession = new UserSession(session, shelterId);

        pipeline = mediaPipeline;
        shelterSession.setWebRtcEndpoint(new WebRtcEndpoint.Builder(pipeline).build());

        WebRtcEndpoint shelterWebRtc = shelterSession.getWebRtcEndpoint();

        shelterWebRtc.addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {
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
        String sdpAnswer = shelterWebRtc.processOffer(sdpOffer);

        JsonObject response = new JsonObject();
        response.addProperty("id", "shelterResponse");
        response.addProperty("response", "accepted");
        response.addProperty("sdpAnswer", sdpAnswer);

        synchronized (session) {
            shelterSession.sendMessage(response);
        }

        shelterWebRtc.gatherCandidates();
    }

    public void addCandidate(IceCandidate cand) {
        shelterSession.addCandidate(cand);
    }

    public void join(WebSocketSession session, Long consumerId, JsonObject jsonMessage) throws IOException {
        UserSession consumerSession = new UserSession(session, consumerId);
        consumers.put(consumerId, consumerSession);

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

        consumerSession.setWebRtcEndpoint(nextWebRtc);
        shelterSession.getWebRtcEndpoint().connect(nextWebRtc);

        String sdpOffer = jsonMessage.getAsJsonPrimitive("sdpOffer").getAsString();
        String sdpAnswer = nextWebRtc.processOffer(sdpOffer);

        JsonObject response = new JsonObject();
        response.addProperty("id", "consumerResponse");
        response.addProperty("response", "accepted");
        response.addProperty("sdpAnswer", sdpAnswer);

        synchronized (session) {
            consumerSession.sendMessage(response);
        }
        nextWebRtc.gatherCandidates();

        log.info("========================================================");
        log.info("ShelterId : {} ======================", shelterSession.getMemberId());
        log.info("SessionId : {} ===========", shelterSession.getSession().getId());
        log.info("========================================================");
        for (UserSession s : consumers.values()) {
            log.info("SessionId : {}, ConsumerId : {}", s.getSession().getId(), s.getMemberId());
        }
        log.info("=======================================================");
    }

    public void addConsumerCandidate(Long consumerId, IceCandidate cand) {
        UserSession consumerSession = consumers.get(consumerId);
        consumerSession.addCandidate(cand);
    }

    public void disconnect(Long consumerId) {
        UserSession consumerSession = consumers.get(consumerId);
        if (consumerSession == null || consumerSession.getWebRtcEndpoint() == null) return;
        consumerSession.getWebRtcEndpoint().release();
        log.info("Exit ConsumerId{} 나간 방 {}", consumerId, shelterSession.getMemberId());
        consumers.remove(consumerId);
    }

    public void destroy() throws IOException {
        for (UserSession consumerSession : consumers.values()) {
            JsonObject response = new JsonObject();
            response.addProperty("id", "stopCommunication");
            consumerSession.sendMessage(response);
        }
        log.info("Releasing media pipeline {}", shelterSession.getMemberId());
        if (pipeline != null) {
            pipeline.release();
        }
        pipeline = null;
        shelterSession = null;
        consumers = null;
    }
}



