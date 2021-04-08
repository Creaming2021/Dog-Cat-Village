package com.pet.signaling;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import org.kurento.client.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;

/**
 * Protocol handler for 1 to N video call communication.
 *
 * @author Boni Garcia (bgarcia@gsyc.es)
 * @since 5.0.0
 */
@Component
public class SignalingHandler extends TextWebSocketHandler {

    private static final Logger log = LoggerFactory.getLogger(SignalingHandler.class);
    private static final Gson gson = new GsonBuilder().create();

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private KurentoClient kurento;

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);
        log.info("Incoming message from session '{}'", session.getId());

        switch (jsonMessage.get("id").getAsString()) {
            case "shelter":
                try {
                    shelter(session, jsonMessage);
                } catch (Throwable t) {
                    handleErrorResponse(t, session, "shelterResponse");
                }
                break;
            case "consumer":
                try {
                    consumer(session, jsonMessage);
                } catch (Throwable t) {
                    handleErrorResponse(t, session, "consumerResponse");
                }
                break;
            case "onIceCandidate": {
                JsonObject candidate = jsonMessage.get("candidate").getAsJsonObject();

                if (roomRepository.isRoom(session.getId())) {
                    Room room = roomRepository.getRoom(session.getId());
                    IceCandidate cand =
                            new IceCandidate(candidate.get("candidate").getAsString(), candidate.get("sdpMid")
                                    .getAsString(), candidate.get("sdpMLineIndex").getAsInt());
                    room.addCandidate(cand);
                } else if (roomRepository.isConsumer(session.getId())) {
                    IceCandidate cand =
                            new IceCandidate(candidate.get("candidate").getAsString(), candidate.get("sdpMid")
                                    .getAsString(), candidate.get("sdpMLineIndex").getAsInt());
                    roomRepository.addConsumerCandidate(session.getId(), cand);
                }

                break;
            }
            case "stop":
                stop(session);
                break;
            case "pingpong":
                pingPongResponse(session, "pingPongResponse");
                break;
            default:
                break;
        }
    }

    private void pingPongResponse(WebSocketSession session, String responseId) throws IOException {
        log.info("PingPongResponse");
        JsonObject response = new JsonObject();
        response.addProperty("id", responseId);
        response.addProperty("response", "pingpong");
        session.sendMessage(new TextMessage(response.toString()));
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

    private synchronized void shelter(final WebSocketSession session, JsonObject jsonMessage)
            throws IOException {

        Long shelterId = jsonMessage.get("shelterId").getAsLong();

        // 방이 없으면 방 생성
        if (!roomRepository.isRoom(shelterId)) {

            roomRepository.addRoom(session, shelterId, jsonMessage, kurento.createMediaPipeline());

        } else {
            JsonObject response = new JsonObject();
            response.addProperty("id", "shelterResponse");
            response.addProperty("response", "rejected");
            response.addProperty("message",
                    "이미 방송중입니다.");
            session.sendMessage(new TextMessage(response.toString()));
        }
    }

    private synchronized void consumer(final WebSocketSession session, JsonObject jsonMessage)
            throws IOException {

        Long shelterId = jsonMessage.get("shelterId").getAsLong();
        Long consumerId = jsonMessage.get("consumerId").getAsLong();

        // 들어가려는 방이 있는지 확인
        if (roomRepository.isRoom(shelterId)) {
            // 지금 접속중인지 확인
            if (roomRepository.checkJoinRoom(consumerId)) {
                // 기존에 보던거 끄기
                roomRepository.disconnectConsumer(session.getId());
            }

            roomRepository.joinRoom(session, shelterId, consumerId, jsonMessage);

        } else {
            JsonObject response = new JsonObject();
            response.addProperty("id", "consumerResponse");
            response.addProperty("response", "rejected");
            response.addProperty("message",
                    "접속하려는 방이 없습니다.");
            session.sendMessage(new TextMessage(response.toString()));
        }

    }

    private synchronized void stop(WebSocketSession session) throws IOException {
        String sessionId = session.getId();

        // Shelter 인 경우
        if (roomRepository.isRoom(sessionId)) {
            roomRepository.destroyRoom(sessionId);
        } else if (roomRepository.isConsumer(sessionId)) {
            roomRepository.disconnectConsumer(sessionId);
        }

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("Disconnect {}", session.getId());
        stop(session);
    }

}