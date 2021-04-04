package donation.pet.service;

import donation.pet.dto.kakaopay.KakaoPayApprovalDto;
import donation.pet.dto.kakaopay.KakaoPayReadyDto;
import donation.pet.exception.FunctionWithException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.function.Function;

@Service
@Slf4j
public class KakaoPayService {

    private static final String HOST = "https://kapi.kakao.com";
    private static final String APP_ADMIN_KEY = "";
    private static final String CID = "";

    private KakaoPayReadyDto kakaoPayReadyDto;
    private int amount;

    // 결제 준비
    public String kakaoPayReady(int amount) {
        this.amount = amount;

        RestTemplate restTemplate = new RestTemplate();

        // 서버로 요청할 Header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + APP_ADMIN_KEY);
        headers.add("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=utf-8");

        // 서버로 요청할 Body
        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
        params.add("cid", CID);
        params.add("partner_order_id", "1");
        params.add("partner_user_id", "melon");
        params.add("item_name", "MABL 코인");
        params.add("quantity", this.amount + "");
        params.add("total_amount", amount + "");
        params.add("tax_free_amount", "0");
        params.add("approval_url", "http://localhost:8080/kakao-pay/success"); // 프론트 페이지 주소로 보내기
        params.add("cancel_url", "http://localhost:8080/kakao-pay/cancel");
        params.add("fail_url", "http://localhost:8080/kakao-pay/fail");

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<>(params, headers);

        try {
            KakaoPayReadyDto kakaoPayReadyDto = restTemplate.postForObject(new URI(HOST + "/v1/payment/ready"), body, KakaoPayReadyDto.class);

            log.info("" + kakaoPayReadyDto);

            return kakaoPayReadyDto.getNext_redirect_pc_url();

        } catch (RestClientException | URISyntaxException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return "/pay";

    }


    // 결제 승인
    public KakaoPayApprovalDto kakaoPayInfo(String pg_token) {
        RestTemplate restTemplate = new RestTemplate();

        // 서버로 요청할 Header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + APP_ADMIN_KEY);
        headers.add("Accept", MediaType.APPLICATION_JSON_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        // 서버로 요청할 Body
        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
        params.add("cid", CID);
        params.add("tid", kakaoPayReadyDto.getTid());
        params.add("partner_order_id", "1");
        params.add("partner_user_id", "melon");
        params.add("pg_token", pg_token);
        params.add("total_amount", this.amount + "");

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);

        try {
            KakaoPayApprovalDto kakaoPayApprovalDto = restTemplate.postForObject(new URI(HOST + "/v1/payment/approve"), body, KakaoPayApprovalDto.class);
            log.info("" + kakaoPayApprovalDto);

            return kakaoPayApprovalDto;

        } catch (RestClientException | URISyntaxException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return null;
    }

}
