package com.pet.signaling;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
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
import java.util.concurrent.ConcurrentHashMap;

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
  private SignalingRepository signalingRepository;

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

        UserSession user = null;

        // 쉘터가 비어있는지 확인
        if (signalingRepository.isShelter(session.getId())) {
          user = signalingRepository.findShelter(session.getId());
        } else if (signalingRepository.isConsumer(session.getId())) {
          user = signalingRepository.findConsumer(session.getId());
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
    String roomName = jsonMessage.get("roomName").getAsString();

    // 방이 없으므로 방 생성 가능
    if (!signalingRepository.getRooms().containsKey(shelterId)) {
      UserSession shelterSession = new UserSession(session);
      shelterSession.setMemberId(shelterId);
      // 방 만들기
      signalingRepository.addRoom(session.getId() , new Room(shelterSession, roomName));

      MediaPipeline pipeline = kurento.createMediaPipeline();
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

      ////////// 방 리스트 출력
      ConcurrentHashMap<Long, Room> rooms = signalingRepository.getRooms();
      log.info("============================ ROOM LIST ============================");
      for (Room r : rooms.values()) {
        log.info("SessionID = {}, RoomName = {}, ShelterId = {}" ,
                r.getShelterSession().getSession().getId(), r.getRoomName(), r.getShelterSession().getMemberId());
      }
      log.info("===================================================================");

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

    // 방이 있는지 확인
    Room room = signalingRepository.findRoom(shelterId);

    // 방이 없으면
    if (room == null || room.getShelterSession().getWebRtcEndpoint() == null) {
      JsonObject response = new JsonObject();
      response.addProperty("id", "consumerResponse");
      response.addProperty("response", "rejected");
      response.addProperty("message",
              "참여할 방이 없습니다.");
      session.sendMessage(new TextMessage(response.toString()));

    } else {  // 방이 있으면
      // Consumer가 방송을 보고있는지 확인
      Room joinRoom = signalingRepository.findConsumerJoinRoom(consumerId);

      // 다른 방송을 보고 있으면 에러 메세지 보내기
      if (joinRoom != null) {
        JsonObject response = new JsonObject();
        response.addProperty("id", "consumerResponse");
        response.addProperty("response", "rejected");
        response.addProperty("message", "다른 방송을 시청중입니다.");
        session.sendMessage(new TextMessage(response.toString()));
        return;
      }

      UserSession shelterSession = room.getShelterSession();

      UserSession consumerSession = new UserSession(session);
      consumerSession.setMemberId(consumerId);
      // 저장하기
      signalingRepository.addConsumer(shelterSession, consumerSession);

      WebRtcEndpoint nextWebRtc = new WebRtcEndpoint
              .Builder(shelterSession.getWebRtcEndpoint().getMediaPipeline()).build();

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


      log.info("================== RoomName : {} ==================", room.getRoomName());
      for (UserSession userSession : room.getConsumers().values()) {
        log.info("SessionID = {}, ConsumerId = {}" , userSession.getSession().getId(), userSession.getMemberId());
      }
      log.info("===================================================================");
    }
  }

  private synchronized void stop(WebSocketSession session) throws IOException {
//    String sessionId = session.getId();
//
//    Room room = signalingRepository.findRoom(sessionId);
//    // consumer 인 경우
//    if (room == null) {
//      Room joinRoom = signalingRepository.findConsumerJoinRoom(sessionId);
//      if (joinRoom != null) {
//        log.info("================== 퇴실 ====================");
//        log.info("sessionid : {}", session.getId());
//        signalingRepository.deleteConsumer(sessionId);
//        log.info("============================================");
//      }
//    } else  {  // shelter 인 경우
//      log.info("============ {}, ({}) 방 파괴 =============", room.getRoomName(), room.getShelterSession().getMemberId());
//      for(UserSession consumer : room.getConsumers().values()) {
//        log.info("시청자 : {} / {}", consumer.getSession().getId(), consumer.getMemberId());
//        JsonObject response = new JsonObject();
//        response.addProperty("id", "stopCommunication");
//        consumer.sendMessage(response);
//        signalingRepository.deleteConsumer(consumer.getSession().getId());
//      }
//      log.info("======================================================");
//      log.info("Releasing media pipeline");
//      MediaPipeline mediaPipeline = room.getShelterSession().getWebRtcEndpoint().getMediaPipeline();
//      if (mediaPipeline != null) {
//        mediaPipeline.release();
//      }
//      mediaPipeline = null;
//      room.setShelterSession(null);
//    }
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    log.info("Disconnect {}", session.getId());
    stop(session);
  }

}