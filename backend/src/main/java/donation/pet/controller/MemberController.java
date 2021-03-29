package donation.pet.controller;

import donation.pet.domain.member.Member;
import donation.pet.dto.consumer.ConsumerSignupRequestDto;
import donation.pet.dto.member.DuplRequestDto;
import donation.pet.dto.member.FindPasswordRequestDto;
import donation.pet.service.MemberService;
import donation.pet.util.CurrentUser;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.weaver.patterns.IToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/members")
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @ApiOperation("사용자 회원 가입")
    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody ConsumerSignupRequestDto dto) {
        log.info("(Post) signup - {}, {}, {}", dto.getEmail(), dto.getName(), dto.getPhoneNumber());
        memberService.signup(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @ApiOperation("닉네임 중복 확인")
    @PostMapping("/duplication")
    public ResponseEntity<Void> checkNickName(@RequestBody DuplRequestDto dto) {
        log.info("(Post) checkNickname - {}", dto.getName());
        memberService.checkDuplicatedNickname(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation("이메일 인증")
    @GetMapping("/auth/{token}")
    public RedirectView authenticateEmail(@PathVariable("token") String token) {
        log.info("(Get) authenticateEmail = {}", token);
        memberService.checkEmailToken(token);
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("http://www.google.com");
        return redirectView;
    }

    @ApiOperation("비밀번호 찾기")
    @PostMapping("/password")
    public ResponseEntity<Void> findPassword(@RequestBody FindPasswordRequestDto dto) {
        log.info("(Post) findPassword = {}", dto);
        memberService.findPassword(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    @PostMapping("/test")
    public void test(@CurrentUser Member member) {
        memberService.test(member);
    }
}
