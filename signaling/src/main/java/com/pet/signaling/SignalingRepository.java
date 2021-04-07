package com.pet.signaling;

import org.springframework.stereotype.Repository;

import java.util.concurrent.ConcurrentHashMap;

@Repository
public class SignalingRepository {

    // <shelterId, Room>
    private ConcurrentHashMap<Long, Room> rooms = new ConcurrentHashMap<>();

    // <UserSession, MemberId>
    private ConcurrentHashMap<UserSession, Long> userSessions = new ConcurrentHashMap<>();
}
