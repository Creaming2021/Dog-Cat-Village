package donation.pet.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum RedirectCode {


    WRONG_EMAIL_CHECK("https://www.naver.com", "이메일 인증 실패");

    private final String url;
    private String message;

    RedirectCode(String url, String message) {
        this.url = url;
        this.message = message;
    }

    RedirectCode(String url) {
        this.url = url;
    }
}
