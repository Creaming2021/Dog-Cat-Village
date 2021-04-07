package com.pet.signaling;

import java.util.concurrent.ConcurrentHashMap;

public class Room {

    UserSession shelterSession;
    String roomName;
    // <consumerId, consumerSession>
    ConcurrentHashMap<Long, UserSession> consumers = new ConcurrentHashMap<>();
}
