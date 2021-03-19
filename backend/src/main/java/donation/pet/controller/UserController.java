package donation.pet.controller;

import donation.pet.dto.*;
import donation.pet.dto.user.DuplReqDto;
import donation.pet.dto.user.UserResDto;
import donation.pet.dto.user.UserSignupReqDto;
import donation.pet.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @ApiOperation("일반 사용자 회원가입")
    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody UserSignupReqDto dto) throws MessagingException {
        userService.signup(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @ApiOperation("닉네임 중복 확인")
    @PostMapping("/check")
    public ResponseEntity<Void> checkNickname(@RequestBody DuplReqDto dto) {
        userService.checkDuplicatedNickname(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation("일반 사용자 로그인")
    @PostMapping("/login")
    public ResponseEntity<UserResDto> loginByUser(@RequestBody LoginReqDto dto) {
        UserResDto resDto = userService.login(dto);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(resDto);
    }

    @ApiOperation("이메일 인증")
    @GetMapping("/authentication/{key}/{email}")
    public void authenticateEmail(@PathVariable("key") String key, @PathVariable("email") String email, HttpServletResponse response) throws IOException {
        userService.checkEmailKey(key, email);
        response.sendRedirect("http://j4b106.p.ssafy.io");
    }

}
