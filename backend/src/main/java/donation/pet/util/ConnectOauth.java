package donation.pet.util;

import donation.pet.dto.member.LoginRequestDto;
import donation.pet.dto.member.LoginResponseDto;
import donation.pet.exception.BaseException;
import donation.pet.exception.ErrorCode;
import org.apache.commons.codec.binary.Base64;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Component
public class ConnectOauth {

    public LoginResponseDto loginCheck(LoginRequestDto dto) {

        String url = "http://localhost:8080/api/oauth/token";

        String credentials = dto.getClientId() + ":" + dto.getClientSecret();
        String basicAuth = new String(Base64.encodeBase64(credentials.getBytes()));

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Basic " + basicAuth);
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("grant_type", "password");
        parameters.add("username", dto.getEmail());
        parameters.add("password", dto.getPassword());

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity httpEntity = new HttpEntity(parameters, httpHeaders);
        ResponseEntity<LoginResponseDto> responseEntity;
        try {
            responseEntity = restTemplate.exchange(url, HttpMethod.POST, httpEntity, LoginResponseDto.class);

        } catch (Exception e) {
            throw new BaseException(ErrorCode.LOGIN_FAIL);
        }

        if (!responseEntity.hasBody()) {
            throw new BaseException(ErrorCode.LOGIN_FAIL);
        }

        return responseEntity.getBody();
    }
}
