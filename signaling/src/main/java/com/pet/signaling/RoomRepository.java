package com.pet.signaling;

import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.kurento.client.IceCandidate;
import org.kurento.client.MediaPipeline;
import org.springframework.stereotype.Repository;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Repository
public class RoomRepository {

    // <shelterId, Room>
    private final ConcurrentHashMap<Long, Room> rooms = new ConcurrentHashMap<>();

    // <SessionId, MemberId> => 강제 종료 시 확인하기 위한 HashMap
    // 세션과 id 매핑
    private final ConcurrentHashMap<String, Long> sessionIdMap = new ConcurrentHashMap<>();
    ////////////////////////////////////////////////////////////////////////////

    // ConsumerId : ShelterId
    private final ConcurrentHashMap<Long, Long> consumerShelterMap = new ConcurrentHashMap<>();

    public boolean isRoom(Long shelterId) {
        return rooms.get(shelterId) != null;
    }

    public boolean isRoom(String sessionId) {
        Long shelterId = sessionIdMap.get(sessionId);
        if (shelterId == null) {
            return false;
        }
        return rooms.get(shelterId) != null;
    }

    public void addRoom(WebSocketSession session, Long shelterId, JsonObject jsonMessage, MediaPipeline mediaPipeline)
            throws IOException {

        // 방 추가
        rooms.put(shelterId,  new Room(session, shelterId, jsonMessage, mediaPipeline));
        // session Id 매핑
        sessionIdMap.put(session.getId(), shelterId);

        showRoomList();
    }

    public void showRoomList() {
        log.info("================ ROOM LIST ================");
        for (Map.Entry<Long, Room> room : rooms.entrySet()) {
            log.info("SessionId : {} | ShelterId : {}",
                    room.getValue().getShelterSession().getSession().getId(),
                    room.getKey());
        }
        log.info("===========================================");
    }

    public Room getRoom(String sessionId) {
        Long shelterId = sessionIdMap.get(sessionId);
        if (shelterId == null) return null;
        return rooms.get(shelterId);
    }

    public boolean checkJoinRoom(Long consumerId) {
        return consumerShelterMap.get(consumerId) != null;
    }

    public void joinRoom(WebSocketSession session, Long shelterId, Long consumerId, JsonObject jsonMessage)
            throws IOException {
        Room room = rooms.get(shelterId);
        room.join(session, consumerId, jsonMessage);

        // session id 매핑
        sessionIdMap.put(session.getId(), consumerId);

        // consumer shelter 매핑
        consumerShelterMap.put(consumerId, shelterId);
    }

    public boolean isConsumer(String sessionId) {
        Long consumerId = sessionIdMap.get(sessionId);
        if (consumerId == null) return false;
        return consumerShelterMap.get(consumerId) != null;
    }

    public void addConsumerCandidate(String sessionId, IceCandidate cand) {
        Long consumerId = sessionIdMap.get(sessionId);
        if (consumerId == null) return;
        Long shelterId = consumerShelterMap.get(consumerId);
        if (shelterId == null) return;
        rooms.get(shelterId).addConsumerCandidate(consumerId, cand);
    }

    public void disconnectConsumer(String sessionId) {
        Long consumerId = sessionIdMap.get(sessionId);
        if (consumerId == null) return;
        Long shelterId = consumerShelterMap.get(consumerId);
        if (shelterId == null) return;
        rooms.get(shelterId).disconnect(consumerId);
        consumerShelterMap.remove(consumerId);
        sessionIdMap.remove(sessionId);
    }

    public void destroyRoom(String sessionId) throws IOException {
        Long shelterId = sessionIdMap.get(sessionId);
        if (shelterId == null) return;
        rooms.get(shelterId).destroy();

        rooms.remove(shelterId);
        sessionIdMap.remove(sessionId);

        for (Map.Entry<Long, Long> entry : consumerShelterMap.entrySet()) {
            if (entry.getValue().equals(shelterId)) {
                consumerShelterMap.remove(entry.getKey());
            }
        }
    }
}
