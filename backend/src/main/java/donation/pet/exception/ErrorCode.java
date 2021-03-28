package donation.pet.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {

    /**
     * ErrorCode Convention
     * 첫번째 숫자 : 서비스 종류
     * 두번째 숫자 : 응답 0, 에러 1
     * 세,네번째 숫자 : 번호
     * ex) 0(서비스종류)0(응답)01(번호)
     *
     * !!!!!!!! 에러코드 만들 때 Httpstatus 는 검색을 통해 확인
     */

    // TODO : 에러코드 Custom 하기
    // 예측 가능한 에러 or Return
    UNEXPECTED_USER(HttpStatus.CONFLICT, "1000", "존재하지 않는 회원입니다."),

    // 서버 에러
    RUNTIME_EXCEPTION(HttpStatus.BAD_REQUEST, "0101"),
    ACCESS_DENIED_EXCEPTION(HttpStatus.UNAUTHORIZED, "0102"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "0103");
    /////////////////////////////////////////

    private final HttpStatus status;
    private final String code;
    private String message;


    ErrorCode(HttpStatus status, String code) {
        this.status = status;
        this.code = code;
    }

    ErrorCode(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }


    public HttpStatus getStatus() { return status; }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

}
