package com.pet.signaling;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
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


    public boolean isRoom(Long shelterId) {
        return rooms.get(shelterId) != null;
    }

    public void addRoom(Room room, Long shelterId, String sessionId) {
        // 방 추가
        rooms.put(shelterId, room);
        // session Id 매핑
        sessionIdMap.put(sessionId, shelterId);
    }

    public void showRoomList() {
        log.info("================ ROOM LIST ================");
        for (Map.Entry<Long, Room> room : rooms.entrySet()) {
            log.info("SessionId : {} | ShelterId : {}",
                    room.getValue().getShelterSession().getSession().getId(), room.getKey());
        }
    }
}
