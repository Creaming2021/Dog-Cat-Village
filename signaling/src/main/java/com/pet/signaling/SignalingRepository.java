package com.pet.signaling;

import org.springframework.stereotype.Repository;

import java.util.concurrent.ConcurrentHashMap;

@Repository
public class SignalingRepository {

    // <shelterId, Room>
    private ConcurrentHashMap<Long, Room> rooms = new ConcurrentHashMap<>();

    // <SessionId, MemberId>
    private final ConcurrentHashMap<String, Long> consumerSessions = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Long> shelterSessions = new ConcurrentHashMap<>();

    public ConcurrentHashMap<Long, Room> getRooms() {
        return rooms;
    }

    public Room findRoom(long shelterId) {
        return rooms.get(shelterId);
    }

    public void addRoom(String sessionId, Long shelterId, Room room) {
        rooms.put(shelterId, room);
        shelterSessions.put(sessionId, shelterId);
    }
}
