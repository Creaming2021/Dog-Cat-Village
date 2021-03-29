package donation.pet.controller;

import donation.pet.dto.consumer.ConsumerResponseDto;
import donation.pet.dto.consumer.ConsumerSignupRequestDto;
import donation.pet.dto.member.DuplRequestDto;
import donation.pet.service.ConsumerService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/consumers")
@Slf4j
public class ConsumerController {

    private final ConsumerService consumerService;

    @ApiOperation("사용자 회원 가입")
    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody ConsumerSignupRequestDto dto) {
        log.info("(Post) signup - {}, {}, {}", dto.getEmail(), dto.getName(), dto.getPhoneNumber());
        consumerService.signup(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @ApiOperation("닉네임 중복 확인")
    @PostMapping("/check")
    public ResponseEntity<Void> checkNickName(@RequestBody DuplRequestDto dto) {
        log.info("(Post) checkNickname - {}", dto.getName());
        consumerService.checkDuplicatedNickname(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation("해당 유저 정보 응답")
    @GetMapping("/{consumerId}")
    public ResponseEntity<ConsumerResponseDto> getConsumer(@PathVariable("consumerId") Long consumerId) {
        ConsumerResponseDto result = consumerService.getConsumer(consumerId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
