package com.pet.signaling;

import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class SignalingRepository {

    // <shelterId, Room>
    private ConcurrentHashMap<Long, Room> rooms = new ConcurrentHashMap<>();


    // <SessionId, MemberId> => 강제 종료 시 확인하기 위한 HashMap
    // 세션과 id 매핑
    private final ConcurrentHashMap<String, Long> sessionMapping = new ConcurrentHashMap<>();
    ////////////////////////////////////////////////////////////////////////////

    // 사용자가 현재 접속중이 ShelterId (사용자 id, 보호소 id)
    private final ConcurrentHashMap<Long, Long> idMapping = new ConcurrentHashMap<>();

    // 방 전체 불러오기
    public ConcurrentHashMap<Long, Room> getRooms() {
        return rooms;
    }

    // 방 불러오기
    public Room findRoom(Long shelterId) {
        return rooms.get(shelterId);
    }

    // 방 불러오기
    public Room findRoom(String sessionId) {
        Long shelterId = idMapping.get(sessionId);
        if (shelterId == null) {
            return null;
        }
        return rooms.get(shelterId);
    }

    // 방 추가하기
    public void addRoom(String sessionId, Room room) {
        rooms.put(room.getShelterSession().getMemberId(), room);
        // 매핑하기
        sessionMapping.put(sessionId, room.getShelterSession().getMemberId());
    }

    // 사용자 접속중인 방 가져오기
    public Room findConsumerJoinRoom(Long consumerId) {
        Long shelterId = idMapping.get(consumerId);
        if (shelterId == null) {
            return null;
        }
        return rooms.get(shelterId);
    }

    public void addConsumer(UserSession shelterSession, UserSession consumerSession) {
        // room에 추가하기
        rooms.get(shelterSession.getMemberId()).getConsumers()
                .put(consumerSession.getMemberId(), consumerSession);

        // 매핑하기
        sessionMapping.put(consumerSession.getSession().getId(), consumerSession.getMemberId());

        // 접속중인 방 매핑
        idMapping.put(consumerSession.getMemberId(), shelterSession.getMemberId());
    }
}
