package donation.pet.controller;

import donation.pet.dto.kakaopay.KakaoPayApprovalDto;
import donation.pet.service.KakaoPayService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class KakaoPayController {

    private final KakaoPayService kakaoPayService;


    @GetMapping("/kakao-pay")
    public void kakaoPay(@RequestParam("amount") int amount,
                           HttpServletResponse response) throws IOException {
        log.info("kakaoPay post.. amount: {}", amount);

//        return "redirect:" + kakaoPayService.kakaoPayReady(amount); // 프론트 주소를 보내보자
        response.sendRedirect(kakaoPayService.kakaoPayReady(amount));
    }

    @GetMapping("/kakao-pay/success/{kakaopayId}")
    public ResponseEntity<KakaoPayApprovalDto> kakaoPaySuccess(@PathVariable("kakaopayId") Long kakaopayId,
                                                               @RequestParam("pg_token") String pg_token) {
        log.info("kakaoPaySuccess get............................................");
        log.info("kakaoPaySuccess kakaopayId : " + kakaopayId);
        log.info("kakaoPaySuccess pg_token : " + pg_token);
        KakaoPayApprovalDto result = kakaoPayService.kakaoPayInfo(kakaopayId, pg_token);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("kakao-pay/cancel")
    public void kakaoPayCancel(HttpServletResponse response) throws IOException {
        log.info("kakaoPayCancel get .....");
        response.sendRedirect("https://j4b106.p.ssafy.com");
    }

    @GetMapping("kakao-pay/fail")
    public void kakaoPayFail(HttpServletResponse response) throws IOException {
        log.info("kakaoPayFail get .....");
        response.sendRedirect("https://j4b106.p.ssafy.com");
    }
}
