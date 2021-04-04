package donation.pet.controller;

import donation.pet.dto.kakaopay.KakaoPayApprovalDto;
import donation.pet.service.KakaoPayService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class KakaoPayController {

    private final KakaoPayService kakaoPayService;

    @GetMapping("/kakao-pay")
    public void kakaoPayGet() {

    }

    @PostMapping("/kakao-pay")
    public String kakaoPay(@RequestParam("amount") int amount) {
        log.info("kakaoPay post.. amount: {}", amount);

        return "redirect:" + kakaoPayService.kakaoPayReady(amount); // 프론트 주소를 보내보자

    }

    @GetMapping("/kakao-pay/success")
    public ResponseEntity<KakaoPayApprovalDto> kakaoPaySuccess(@RequestParam("pg_token") String pg_token) {
        log.info("kakaoPaySuccess get............................................");
        log.info("kakaoPaySuccess pg_token : " + pg_token);
        KakaoPayApprovalDto result = kakaoPayService.kakaoPayInfo(pg_token);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
