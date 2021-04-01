package donation.pet.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import donation.pet.domain.chat.ChatMessage;
import donation.pet.domain.member.Member;
import donation.pet.domain.member.MemberRepository;
import donation.pet.dto.chat.*;
import donation.pet.exception.BaseException;
import donation.pet.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final MemberRepository memberRepository;
    private final StringRedisTemplate redisTemplate;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ModelMapper modelMapper;

    private ObjectMapper objectMapper;
    private ListOperations<String, String> listOps;
    private ValueOperations<String, String> valOps;

    /*
     * 채팅방 만들기
     * 1. 채팅방 중복 확인
     * 2. 채팅방 개설
     * */
    public ChatCheckResponseDto check(ChatCheckRequestDto dto) throws JsonProcessingException {

        // 왜 얘만 필드로 바꾸면 안되냐고 하니.. 하나라서?
        SetOperations<String, String> setOps = redisTemplate.opsForSet();
        String roomId = null;

        // 근데 보낸 dto에 있는 아이디들이 없는 유저라면?

        // 채팅을 한적이 없다면
        // Long으로 바꾸자
        String myId = String.valueOf(dto.getMyId());
        String oppId = String.valueOf(dto.getOppId());
        if(!setOps.isMember("checkRoomKey:" + myId, oppId)) {
            // 서로 채팅방 목록에 추가
            setOps.add("checkRoomKey:" + myId, oppId);
            setOps.add("checkRoomKey:" + oppId, myId);
            roomId = makeRoomId(myId, oppId);
        }else {
            // 이미 있는 방의 id를 반납한다.
            // 이거 어떻게 할지 상의하기 => 1:1을 눌렀는데 채팅방 리스트로? 아니면 채팅 바로?
            // 채팅 바로겠지...
            Set<String> opps = setOps.members("checkRoomKey:" + myId);
            for(String opp : opps) {
                if(opp.equals(oppId)) roomId = opp;
            }
        }

        return new ChatCheckResponseDto(roomId);
    }

    // 채팅방 개설하기
    public String makeRoomId(String myId, String oppId) throws JsonProcessingException {

        String roomId = UUID.randomUUID().toString();

        valOps = redisTemplate.opsForValue();
        objectMapper = new ObjectMapper();

        // 에러 코드 변경
        Member my = memberRepository.findById(Long.parseLong(myId))
                .orElseThrow(() -> new BaseException(ErrorCode.INTERNAL_SERVER_ERROR));
        Member opp = memberRepository.findById(Long.parseLong(oppId))
                .orElseThrow(() -> new BaseException(ErrorCode.INTERNAL_SERVER_ERROR));

        // 내 채팅방 생성
        String myRoomStr = objectMapper.writeValueAsString(makeRoom(roomId, opp));
        String oppRoomStr = objectMapper.writeValueAsString(makeRoom(roomId, my));

        // 채팅방 저장
        valOps.set("roomInfo:" + my.getId() + ":" + opp.getId(), myRoomStr);
        valOps.set("roomInfo:" + opp.getId() + ":" + my.getId(), oppRoomStr);

        return roomId;

    }
    
    // dto로 변경 가능
    private Map<String, Object> makeRoom(String roomId, Member member) {
        Map<String, Object> room = new HashMap<>();
        room.put("roomId", roomId);
        room.put("oppName", member.getName());
        room.put("oppProfileImage", member.getProfileImage());
        room.put("oppId", member.getId());
        room.put("used", 1); // 사용중
        return room;
    }

    /*
     * 채팅방 목록 가져오기
     * */
    public ChatListResponseDto getRoomList(String memberId) throws JsonProcessingException {

        objectMapper = new ObjectMapper();
        Set<String> keys = redisTemplate.keys("roomInfo:" + memberId + ":*");
        valOps = redisTemplate.opsForValue();

        List<ChatRoomInfoDto> roomList = new ArrayList<>();
        for (String oppId : keys) {
            String roomInfoStr = valOps.get(oppId);
            Map<String, String> roomInfoObj = objectMapper.readValue(roomInfoStr, Map.class);
            log.info("room의 정보들에서 무엇을 빼낼지 보자 : {} ", roomInfoStr);
            String roomId = roomInfoObj.get("roomId");
            String oppName = roomInfoObj.get("oppName");
            String recentMsg = getRecentMessage(roomId); // 채팅창 목록에서 보여주는 마지막 메시지
            ChatRoomInfoDto dto = ChatRoomInfoDto.builder()
                    .roomId(roomId)
                    .oppName(oppName)
                    .recentMsg(recentMsg).build();
            roomList.add(dto);
        }

        return new ChatListResponseDto(roomList);
    }

    /*
     * 최근 메시지 가져오기
     * */
    public String getRecentMessage(String room_id) throws JsonProcessingException {
        String key = "message:" + room_id;
        listOps = redisTemplate.opsForList();
        List<String> str = listOps.range(key, 0, 0);
        String res = "";
        // 메시지가 있으면
        if (str.size() != 0) {
            ChatMessage chat = objectMapper.readValue(str.get(0), ChatMessage.class);
            res = chat.getMsg();
        }
        return res;
    }

    /*
    * 알림 가져오기
    * */
    public ChatNoticeResponseDto getNotice(String memberId) {

        Set<String> keys = redisTemplate.keys("notice:" + memberId + ":*");
        log.info("나오니? {}", keys);
        valOps = redisTemplate.opsForValue();
        List<ChatNoticeDto> list = new ArrayList<>();
        // 나에게 보낸 사람들을 모두 조회
        for (String pattern : keys) {
            // {count : val, oppName: "moon"} 이런 형태로 리스트에 저장
            Map<String, Object> res = new HashMap<>();
            String[] oppIds = pattern.split(":");
            Member opp = memberRepository.findById(Long.parseLong(oppIds[2]))
                    .orElseThrow(() -> new BaseException(ErrorCode.CONSUMER_NOT_EXIST));
                                        // member 통틀어서 없는 에러코드 만들어서 변경하기
            // 일림이 0인것은 걸러준다
            if (Integer.valueOf(valOps.get(pattern)) != 0) {
                ChatNoticeDto dto = ChatNoticeDto.builder()
                        .count(Long.valueOf(valOps.get(pattern)))
                        .oppName(opp.getName())
                        .build();
                list.add(dto);
            }
        }
        return new ChatNoticeResponseDto(list);
    }

    /*
    * 알림 초기화
    * */
    public void updateNotice(String myId, String oppId) {
        String key = "notice:" + myId + ":" + oppId;
        valOps = redisTemplate.opsForValue();
        valOps.set(key, "0");
    }

    public void deleteRoom(String myId, String oppId) {
        // 해야하는가..
    }

    /*
    * 메시지 모두 가져오기
    * */
    public ChatMessageListDto getMessageList(int startNum, int endNum, String roomId, String myId, String oppId) throws JsonProcessingException {

        // id 받고나서 알림 초기화하기
        valOps = redisTemplate.opsForValue();
        String key = "notice:" + myId + ":" + oppId;
        valOps.set(key, "0");
    
        // 메시지 반환
        List<ChatMessageDto> list = getMessageList(startNum, endNum, roomId);
        log.info("메시지 반환");
        return new ChatMessageListDto(list);

    }
    
    // 제대로 리팩토링 필요함
    public List<ChatMessageDto> getMessageList(int startNum, int endNum, String roomId) throws JsonProcessingException {
        String key = "message:" + roomId;
        listOps = redisTemplate.opsForList();
        objectMapper = new ObjectMapper();
        List<String> str = listOps.range(key, startNum, endNum);
        List<ChatMessageDto> msgList = new ArrayList<>();
        for (String json : str) {
            log.info(">>>>>>>>>>>>>> MessageList <<<<<<<<<<<<< {} ", json);
            ChatMessageDto dto = objectMapper.readValue(json, ChatMessageDto.class);
            msgList.add(dto);
        }
//        List<ChatMessageDto> result = msgList.stream().map(msgInfo -> modelMapper.map(msgInfo, ChatMessageDto.class)).collect(Collectors.toList());
        return msgList;
    }

    /*
    * /receive
    * */
    public void receiveMsg(ChatMessageDto message) throws JsonProcessingException {
        Map<String, Object> resultMap = new HashMap<>();
        String roomId = message.getRoomId();
        String oppId = message.getOppId();
        String myId = message.getMyId();
        String oppName = message.getOppName();
        // 메시지 날짜 출력 잘되는지
        log.info("날짜는: {} ", message.getDate());
        valOps = redisTemplate.opsForValue();
        String key = "notice:" + oppId + ":" + myId;
        // 롸
        valOps.increment(key, 1);
        // {count: 1, nickname:""}
        Map<String, String> notices = new HashMap<>();
        notices.put("oppName", oppName);
        simpMessagingTemplate.convertAndSend("/notice/" + oppId, notices);
        insertMessage(message);
        simpMessagingTemplate.convertAndSend("/message/" + roomId + "/" + oppId, message);
    }

    /*
     * 메시지 저장하기
     * */
    public void insertMessage(ChatMessageDto message) throws JsonProcessingException {
        String key = "message:" + message.getRoomId();
        listOps = redisTemplate.opsForList();
        objectMapper = new ObjectMapper();
        log.info("key:{}", key);
        log.info("messages:{}", message.getMsg());
        String strMsg = objectMapper.writeValueAsString(message);
        listOps.leftPush(key, strMsg);
    }

}