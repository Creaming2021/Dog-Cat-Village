package donation.pet.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import donation.pet.domain.chat.ChatMessage;
import donation.pet.dto.chat.*;
import donation.pet.service.ChatService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/chats")
@Slf4j
public class ChatController {

    private final ChatService chatService;

    /*
     * 1. 사용자가 보호소 메인 페이지의 1:1 채팅을 눌렀을 경우,
     *   1-1. 이미 채팅을 한 적 있는 경우, 그 채팅방 아아디 return
     *   1-2. 채팅을 한번도 한 적 없는 경우, 채팅방을 개설 후 아이디 return
     * */

    // 1) 여기서 error - try catch로 따로 처리할지말지
    // 여기 String 반환이 아니라 Dto 반환으로
    @ApiOperation("채팅방이 개설된 적이 없으면 채팅방을 생성 없으면?")
    @PostMapping("/check")
    public ResponseEntity<ChatCheckResponseDto> check(@Valid @RequestBody ChatCheckRequestDto dto) throws JsonProcessingException {
        log.info("consumerId: {}, centerId: {}", dto.getMyId(), dto.getOppId());
        ChatCheckResponseDto result = chatService.check(dto);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    
    @ApiOperation(value = "나의 채팅방 리스트를 출력")
    @GetMapping(value = "/rooms")
    public ResponseEntity<ChatListResponseDto> getRoomList(@RequestParam("memberId") String memberId) throws JsonProcessingException {
        // 처리하는 코드 ! get => param 변경시 진짜 유저랑 일치하는지의 여부?
        ChatListResponseDto result = chatService.getRoomList(memberId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    
    // 진행중
    @ApiOperation(value = "알림 가져오기")
    @GetMapping(value = "/notice/{memberId}")
    public ResponseEntity<ChatNoticeResponseDto> getNotice(@PathVariable String memberId) {
        ChatNoticeResponseDto result = chatService.getNotice(memberId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "알림 0으로 초기화")
    @PutMapping(value = "/notice")
    public ResponseEntity<Void> updateNotice(@RequestParam("myId") String myId,
                                             @RequestParam("oppId") String oppId) {
        chatService.updateNotice(myId, oppId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation(value = "채팅방 삭제 - 상의 후 기능 구현")
    @DeleteMapping(value = "/rooms")
    public ResponseEntity<Void> deleteMyRoom(@RequestParam("myId") String myId,
                                             @RequestParam("oppId") String oppId) {
        chatService.deleteRoom(myId, oppId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation(value = "방에 입장 => 메시지 리스트 반환")
    @GetMapping(value = "/rooms/{roomId}")
    public ResponseEntity<ChatMessageListDto> getMessageList(@RequestParam("startNum") int startNum,
                                                             @RequestParam("endNum") int endNum,
                                                             @PathVariable("roomId") String roomId,
                                                             @RequestParam("myId") String myId,
                                                             @RequestParam("oppId") String oppId) throws JsonProcessingException {
        ChatMessageListDto result = chatService.getMessageList(startNum, endNum, roomId, myId, oppId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @MessageMapping("/receive")
    public void receiveMsg(ChatMessageDto message) throws Exception {
        log.info("chatmessage: {}", message);
        chatService.receiveMsg(message);
    }

}
