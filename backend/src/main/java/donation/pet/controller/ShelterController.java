package donation.pet.controller;

import donation.pet.domain.shelter.Shelter;
import donation.pet.dto.LoginReqDto;
import donation.pet.dto.shelter.ShelterResDto;
import donation.pet.dto.shelter.ShelterSignupReqDto;
import donation.pet.service.ShelterService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/shelters")
public class ShelterController {

    private final ShelterService shelterService;

    @ApiOperation("보호소 사용자 회원가입")
    @PostMapping("/signup")
    public ResponseEntity<Void> signup(ShelterSignupReqDto dto) throws MessagingException {
        shelterService.signup(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @ApiOperation("보호소 사용자 로그인")
    @PostMapping("/login")
    public ResponseEntity<ShelterResDto> loginByShelter(@RequestBody LoginReqDto dto) {
        ShelterResDto resDto = shelterService.login(dto);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(resDto);
    }

    @ApiOperation("이메일 인증")
    @GetMapping("/authentication/{key}/{email}")
    public void authenticateEmail(@PathVariable("key") String key, @PathVariable("email") String email, HttpServletResponse response) throws IOException {
        shelterService.checkEmailKey(key, email);
        response.sendRedirect("http://j4b106.p.ssafy.io");
    }

}
