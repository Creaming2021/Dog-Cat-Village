package donation.pet.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class KakaoPayServiceTest {

    @Autowired
    KakaoPayService kakaoPayService;

    @Test
    public void 결제_준비() throws Exception {
        // given
        String s = kakaoPayService.kakaoPayReady(10000);

        // when
        System.out.println(s);

        // then
    }
}