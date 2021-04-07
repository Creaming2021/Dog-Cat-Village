package donation.pet.controller;

import donation.pet.dto.kakaopay.AddressDto;
import donation.pet.dto.kakaopay.KakaoPayApprovalDto;
import donation.pet.service.KakaoPayService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/kakao-pay")
@RequiredArgsConstructor
public class KakaoPayController {

    private final KakaoPayService kakaoPayService;


    @GetMapping
    public ResponseEntity<AddressDto> kakaoPay(@RequestParam("amount") int amount,
                                               HttpServletResponse response) throws IOException {
        log.info("kakaoPay post.. amount: {}", amount);

//        return "redirect:" + kakaoPay3334Service.kakaoPayReady(amount); // 프론트 주소를 보내보자
        String result = kakaoPayService.kakaoPayReady(amount);
        log.info("result: {}", result);
        return ResponseEntity.status(HttpStatus.OK).body(new AddressDto(result));
    }

    @GetMapping("/success/{kakaopayId}")
    public RedirectView kakaoPaySuccess(@PathVariable("kakaopayId") Long kakaopayId,
                                        HttpServletResponse response,
                                        @RequestParam("pg_token") String pg_token) throws IOException {
        log.info("kakaoPaySuccess get............................................");
        log.info("kakaoPaySuccess kakaopayId : " + kakaopayId);
        log.info("kakaoPaySuccess pg_token : " + pg_token);
        KakaoPayApprovalDto result = kakaoPayService.kakaoPayInfo(kakaopayId, pg_token);

//        return ResponseEntity.status(HttpStatus.OK).body(result.getQuantity());
//        response.sendRedirect("https://j4b106.p.ssafy.io/profile/" + result.getQuantity());
        return new RedirectView("https://j4b106.p.ssafy.io/blockchain/" + result.getQuantity());
    }

    @GetMapping("/cancel")
    public void kakaoPayCancel(HttpServletResponse response) throws IOException {
        log.info("kakaoPayCancel get .....");
        response.sendRedirect("https://j4b106.p.ssafy.io");
    }

    @GetMapping("/fail")
    public void kakaoPayFail(HttpServletResponse response) throws IOException {
        log.info("kakaoPayFail get .....");
        response.sendRedirect("https://j4b106.p.ssafy.io");
    }
}
