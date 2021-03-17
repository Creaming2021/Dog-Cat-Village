package donation.pet.exception;

public enum ErrorCode {

    UNEXPECTED(0, "서버 내부 에러."),
    UNEXPECTED_USER(1000, "존재하지 않는 회원입니다."),
    MEMBER_DUPLICATED_EMAIL(1100, "이미 가입된 이메일입니다."),
    MEMBER_DUPLICATED_NICKNAME(1200, "이미 존재하는 닉네임입니다."),
    WRONG_EMAIL_CHECK_AUTH(1300, "인증되지 않은 유저입니다."),
    WRONG_PASSWORD(1400, "잘못된 비밀번호입니다."),
    FAIL_EMAIL_SEND(1500, "인증 메일 발송에 실패하였습니다.");

    private final Integer code;
    private final String message;

    ErrorCode(final Integer code, final String message) {
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

}
