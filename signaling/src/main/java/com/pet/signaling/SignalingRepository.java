package com.pet.signaling;

import org.springframework.stereotype.Repository;

import java.util.concurrent.ConcurrentHashMap;

@Repository
public class SignalingRepository {

    // <shelterId, Room>
    private ConcurrentHashMap<Long, Room> rooms = new ConcurrentHashMap<>();


    // <SessionId, MemberId> => 강제 종료 시 확인하기 위한 HashMap
    // 세션과 id 매핑
    private final ConcurrentHashMap<String, Long> sessionIdMap = new ConcurrentHashMap<>();
    ////////////////////////////////////////////////////////////////////////////

    // ConsumerId : ShelterId
    private final ConcurrentHashMap<Long, Long> consumerShelterMap = new ConcurrentHashMap<>();

    // 방 전체 불러오기
    public ConcurrentHashMap<Long, Room> getRooms() {
        return rooms;
    }

    // shelterId로 방 불러오기
    public Room findRoom(Long shelterId) {
        return rooms.get(shelterId);
    }

    // sessionId로 방 불러오기
    public Room findRoom(String sessionId) {
        Long shelterId = sessionIdMap.get(sessionId);
        if (shelterId == null) {
            return null;
        }
        return rooms.get(shelterId);
    }

    // shelter인지 확인하기
    public boolean isShelter(String sessionId) {
        Long shelterId = sessionIdMap.get(sessionId);
        if (shelterId == null) {
            return false;
        }
        return rooms.containsKey(shelterId);
    }
    // consumer인지 확인하기
    public boolean isConsumer(String sessionId) {
        Long consumerId = sessionIdMap.get(sessionId);
        if (consumerId == null) {
            return false;
        }
        return consumerShelterMap.containsKey(consumerId);
    }

    // 방 추가하기
    public void addRoom(String sessionId, Room room) {
        rooms.put(room.getShelterSession().getMemberId(), room);
        // 매핑하기
        sessionIdMap.put(sessionId, room.getShelterSession().getMemberId());
    }

    // 사용자 접속중인 방 가져오기
    public Room findConsumerJoinRoom(Long consumerId) {
        Long shelterId = consumerShelterMap.get(consumerId);
        if (shelterId == null) {
            return null;
        }
        return rooms.get(shelterId);
    }

    // 방에 시청자 추가하기
    public void addConsumer(UserSession shelterSession, UserSession consumerSession) {
        // room에 추가하기
        rooms.get(shelterSession.getMemberId()).getConsumers()
                .put(consumerSession.getMemberId(), consumerSession);

        // 매핑하기
        sessionIdMap.put(consumerSession.getSession().getId(), consumerSession.getMemberId());

        // 접속중인 방 매핑
        consumerShelterMap.put(consumerSession.getMemberId(), shelterSession.getMemberId());
    }

    public UserSession findConsumer(String sessionId) {
        // 컨슈머가 접속중인 shelter 찾기
        Long shelterId = consumerShelterMap.get(sessionId);
        if (shelterId == null) {
            return null;
        }
        return rooms.get(shelterId).getConsumers().get(sessionId);
    }

    public UserSession findShelter(String sessionId) {
        // 쉘터의 id 변환
        Long shelterId = sessionIdMap.get(sessionId);
        if (shelterId == null) {
            return null;
        }
        return rooms.get(shelterId).getShelterSession();
    }

    public void deleteConsumer(String sessionId) {
        // 연결된 쉘터 가져오기
        Long consumerId = sessionIdMap.get(sessionId);
        Long shelterId = consumerShelterMap.get(consumerId);
        Room room = rooms.get(shelterId);
        room.getConsumers().remove(consumerId);
        consumerShelterMap.remove(consumerId);
        sessionIdMap.remove(sessionId);
    }

    public void deleteShelter(String sessionId) {
        Long shelterId = sessionIdMap.get(sessionId);
        rooms.remove(shelterId);
        sessionIdMap.remove(sessionId);
    }
}
