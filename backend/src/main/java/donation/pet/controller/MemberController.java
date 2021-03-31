package donation.pet.controller;

import donation.pet.common.AppProperties;
import donation.pet.dto.consumer.ConsumerSignupRequestDto;
import donation.pet.dto.member.*;
import donation.pet.service.MemberService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.configurationprocessor.json.JSONException;
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
    private final AppProperties appProperties;

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
        log.info("(Get) authenticateEmail - {}", token);
        memberService.checkEmailToken(token);
        RedirectView redirectView = new RedirectView();
        // todo 링크나오면 바꾸기
        redirectView.setUrl(appProperties.getServerUrl() + "/signup/success");
        return redirectView;
    }

    @ApiOperation("로그인")
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto dto) {
        log.info("(Post) login - {}", dto.getEmail());
        LoginResponseDto loginResponseDto = memberService.login(dto);
        return ResponseEntity.status(HttpStatus.OK).body(loginResponseDto);
    }

    @ApiOperation("비밀번호 찾기 신청")
    @PostMapping("/forget")
    public ResponseEntity<Void> forgetPassword(@RequestBody FindPasswordRequestDto dto) {
        log.info("(Post) forgetPassword - {}", dto.getEmail());
        memberService.forgetPassword(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation("비밀번호 링크 만들기")
    @GetMapping("/password/{token}")
    public RedirectView makeChangeLink(@PathVariable("token") String token) {
        log.info("(Get) makeChangeLink - {}", token);
        memberService.makeChangeLink(token);
        RedirectView redirectView = new RedirectView();
        // todo 링크 나오면 수정
        redirectView.setUrl(appProperties.getServerUrl() + "/members/password/" + token);
        return redirectView;
    }

    @ApiOperation("비밀번호 변경 링크로 비밀번호 변경")
    @PostMapping("/password/{token}")
    public ResponseEntity<Void> changeLinkPassword(@RequestBody PasswordRequestDto passwordRequestDto,
                                       @PathVariable("token") String token) {
        log.info("(Get) changeLinkPassword - {}", token);
        memberService.changeLinkPassword(passwordRequestDto, token);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/test")
    public ResponseEntity<Void> test() {
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
