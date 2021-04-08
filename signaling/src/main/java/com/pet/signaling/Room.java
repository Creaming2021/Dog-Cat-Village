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

    public Room(WebSocketSession session, Long shelterId, JsonObject jsonMessage, MediaPipeline pipeline)
            throws IOException {
        UserSession shelterSession = new UserSession(session, shelterId);

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
}



