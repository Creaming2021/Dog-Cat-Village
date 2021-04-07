package com.pet.signaling;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.concurrent.ConcurrentHashMap;

@Getter
public class Room {

    private UserSession shelterSession;
    private String roomName;
    // <consumerId, consumerSession>
    private ConcurrentHashMap<Long, UserSession> consumers = new ConcurrentHashMap<>();

    public Room(UserSession shelterSession, String roomName) {
        this.shelterSession = shelterSession;
        this.roomName = roomName;
    }
}
