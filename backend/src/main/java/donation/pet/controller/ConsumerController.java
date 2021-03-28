package donation.pet.controller;

import donation.pet.dto.consumer.ConsumerSignupRequestDto;
import donation.pet.dto.consumer.ConsumerSignupResponseDto;
import donation.pet.dto.member.DuplRequestDto;
import donation.pet.exception.BaseException;
import donation.pet.exception.ErrorCode;
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
    public ResponseEntity<ConsumerSignupResponseDto> signup(@RequestBody ConsumerSignupRequestDto dto) {
        log.info("(Post) signup - {}, {}, {}", dto.getEmail(), dto.getName(), dto.getPhoneNumber());
        ConsumerSignupResponseDto consumerSignupResponseDto = consumerService.signup(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(consumerSignupResponseDto);
    }

    @ApiOperation("닉네임 중복 확인")
    @PostMapping("/check")
    public ResponseEntity<Void> checkNickName(@RequestBody DuplRequestDto dto) {
        log.info("(Post) checkNickname - {}", dto.getName());
//        throw new BaseException(ErrorCode.FAIL_EMAIL_SEND);
        consumerService.test();
        return ResponseEntity.status(HttpStatus.OK).build();
    }
//
//    @PostMapping("/test")
//    public ResponseEntity test() {
//        return ResponseEntity.status(HttpStatus.OK).body("1");
//    }
}
