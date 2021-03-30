package donation.pet.exception;

import lombok.Getter;

@Getter
public enum RedirectCode {

    // todo 링크 수정
    WRONG_EMAIL_CHECK("/signup/fail", "이메일 인증 실패"),
    MEMBER_NOT_FOUND("https://www.naver.com", "계정 없음"),
    EXPIRE_PASSWORD_LINK("/password/expire", "패스워드 변경 링크 만료");

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
