package donation.pet.util;

import donation.pet.common.AppProperties;
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

    private final AppProperties appProperties;

    public ConnectOauth(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    public LoginResponseDto loginCheck(String authorization, LoginRequestDto dto) {

        String url = appProperties.getServerUrl() + "/api/oauth/token";

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", authorization);
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("grant_type", dto.getGrant_type());
        parameters.add("username", dto.getUsername());
        parameters.add("password", dto.getPassword());
        System.out.println(dto.getGrant_type() + " " +  dto.getUsername() + " " + dto.getPassword());

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
