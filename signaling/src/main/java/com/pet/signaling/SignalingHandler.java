package com.pet.signaling;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
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
import java.util.concurrent.ConcurrentHashMap;

/**
 * Protocol handler for 1 to N video call communication.
 *
 * @author Boni Garcia (bgarcia@gsyc.es)
 * @since 5.0.0
 */
@Component
@RequiredArgsConstructor
public class SignalingHandler extends TextWebSocketHandler {

  private static final Logger log = LoggerFactory.getLogger(SignalingHandler.class);
  private static final Gson gson = new GsonBuilder().create();

  private final SignalingRepository signalingRepository;
  private final KurentoClient kurento;

  private MediaPipeline pipeline;
  private UserSession shelterUserSession;

  @Override
  public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);
    log.debug("Incoming message from session '{}': {}", session.getId(), jsonMessage);

    switch (jsonMessage.get("id").getAsString()) {
      case "shelter":
        try {
          log.info("shelterId : {}, roomName : {}", jsonMessage.get("shelterId"), jsonMessage.get("roomName"));
//          shelter(session, jsonMessage);
        } catch (Throwable t) {
//          handleErrorResponse(t, session, "shelterResponse");
        }
        break;
      case "consumer":
        try {
          log.info("shelterId : {}, consumerId : {}", jsonMessage.get("shelterId"), jsonMessage.get("consumerId"));
//          consumer(session, jsonMessage);
        } catch (Throwable t) {
//          handleErrorResponse(t, session, "consumerResponse");
        }
        break;
//      case "onIceCandidate": {
//        JsonObject candidate = jsonMessage.get("candidate").getAsJsonObject();
//
//        UserSession user = null;
//        if (shelterUserSession != null) {
//          if (shelterUserSession.getSession() == session) {
//            user = shelterUserSession;
//          } else {
//            user = consumers.get(session.getId());
//          }
//        }
//        if (user != null) {
//          IceCandidate cand =
//                  new IceCandidate(candidate.get("candidate").getAsString(), candidate.get("sdpMid")
//                          .getAsString(), candidate.get("sdpMLineIndex").getAsInt());
//          user.addCandidate(cand);
//        }
//        break;
//      }
//      case "stop":
//        stop(session);
//        break;
      default:
        break;
    }
  }

//  private void handleErrorResponse(Throwable throwable, WebSocketSession session, String responseId)
//          throws IOException {
//    stop(session);
//    log.error(throwable.getMessage(), throwable);
//    JsonObject response = new JsonObject();
//    response.addProperty("id", responseId);
//    response.addProperty("response", "rejected");
//    response.addProperty("message", throwable.getMessage());
//    session.sendMessage(new TextMessage(response.toString()));
//  }

//  private synchronized void shelter(final WebSocketSession session, JsonObject jsonMessage)
//          throws IOException {
//    if (shelterUserSession == null) {
//      shelterUserSession = new UserSession(session);
//
//      pipeline = kurento.createMediaPipeline();
//      shelterUserSession.setWebRtcEndpoint(new WebRtcEndpoint.Builder(pipeline).build());
//
//      WebRtcEndpoint shelterWebRtc = shelterUserSession.getWebRtcEndpoint();
//
//      shelterWebRtc.addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {
//
//        @Override
//        public void onEvent(IceCandidateFoundEvent event) {
//          JsonObject response = new JsonObject();
//          response.addProperty("id", "iceCandidate");
//          response.add("candidate", JsonUtils.toJsonObject(event.getCandidate()));
//          try {
//            synchronized (session) {
//              session.sendMessage(new TextMessage(response.toString()));
//            }
//          } catch (IOException e) {
//            log.debug(e.getMessage());
//          }
//        }
//      });
//
//      String sdpOffer = jsonMessage.getAsJsonPrimitive("sdpOffer").getAsString();
//      String sdpAnswer = shelterWebRtc.processOffer(sdpOffer);
//
//      JsonObject response = new JsonObject();
//      response.addProperty("id", "shelterResponse");
//      response.addProperty("response", "accepted");
//      response.addProperty("sdpAnswer", sdpAnswer);
//
//      synchronized (session) {
//        shelterUserSession.sendMessage(response);
//      }
//      shelterWebRtc.gatherCandidates();
//
//    } else {
//      JsonObject response = new JsonObject();
//      response.addProperty("id", "shelterResponse");
//      response.addProperty("response", "rejected");
//      response.addProperty("message",
//              "Another user is currently acting as sender. Try again later ...");
//      session.sendMessage(new TextMessage(response.toString()));
//    }
//  }
//
//  private synchronized void consumer(final WebSocketSession session, JsonObject jsonMessage)
//          throws IOException {
//    if (shelterUserSession == null || shelterUserSession.getWebRtcEndpoint() == null) {
//      JsonObject response = new JsonObject();
//      response.addProperty("id", "consumerResponse");
//      response.addProperty("response", "rejected");
//      response.addProperty("message",
//              "No active sender now. Become sender or . Try again later ...");
//      session.sendMessage(new TextMessage(response.toString()));
//    } else {
//      if (consumers.containsKey(session.getId())) {
//        JsonObject response = new JsonObject();
//        response.addProperty("id", "consumerResponse");
//        response.addProperty("response", "rejected");
//        response.addProperty("message", "You are already viewing in this session. "
//                + "Use a different browser to add additional consumers.");
//        session.sendMessage(new TextMessage(response.toString()));
//        return;
//      }
//      UserSession consumer = new UserSession(session);
//      consumers.put(session.getId(), consumer);
//
//      WebRtcEndpoint nextWebRtc = new WebRtcEndpoint.Builder(pipeline).build();
//
//      nextWebRtc.addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {
//
//        @Override
//        public void onEvent(IceCandidateFoundEvent event) {
//          JsonObject response = new JsonObject();
//          response.addProperty("id", "iceCandidate");
//          response.add("candidate", JsonUtils.toJsonObject(event.getCandidate()));
//          try {
//            synchronized (session) {
//              session.sendMessage(new TextMessage(response.toString()));
//            }
//          } catch (IOException e) {
//            log.debug(e.getMessage());
//          }
//        }
//      });
//
//      consumer.setWebRtcEndpoint(nextWebRtc);
//      shelterUserSession.getWebRtcEndpoint().connect(nextWebRtc);
//      String sdpOffer = jsonMessage.getAsJsonPrimitive("sdpOffer").getAsString();
//      String sdpAnswer = nextWebRtc.processOffer(sdpOffer);
//
//      JsonObject response = new JsonObject();
//      response.addProperty("id", "consumerResponse");
//      response.addProperty("response", "accepted");
//      response.addProperty("sdpAnswer", sdpAnswer);
//
//      synchronized (session) {
//        consumer.sendMessage(response);
//      }
//      nextWebRtc.gatherCandidates();
//    }
//  }
//
//  private synchronized void stop(WebSocketSession session) throws IOException {
//    String sessionId = session.getId();
//    if (shelterUserSession != null && shelterUserSession.getSession().getId().equals(sessionId)) {
//      for (UserSession consumer : consumers.values()) {
//        JsonObject response = new JsonObject();
//        response.addProperty("id", "stopCommunication");
//        consumer.sendMessage(response);
//      }
//
//      log.info("Releasing media pipeline");
//      if (pipeline != null) {
//        pipeline.release();
//      }
//      pipeline = null;
//      shelterUserSession = null;
//    } else if (consumers.containsKey(sessionId)) {
//      if (consumers.get(sessionId).getWebRtcEndpoint() != null) {
//        consumers.get(sessionId).getWebRtcEndpoint().release();
//      }
//      consumers.remove(sessionId);
//    }
//  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
//    stop(session);
  }

}