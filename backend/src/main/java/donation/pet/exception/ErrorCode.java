package donation.pet.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {

    /**
     * ErrorCode Convention
     * 첫,두번째 숫자 : 서비스 종류
     * 세번째 숫자 : 응답 0, 에러 1
     * 네,다섯번째 숫자 : 번호
     * ex) 01(서비스종류)0(응답)01(번호)
     *
     * !!!!!!!! 에러코드 만들 때 Httpstatus 는 검색을 통해 확인
     */

    // TODO : 에러코드 Custom 하기
    // 예측 가능한 에러 or Return
    EMAIL_DUPLICATION(HttpStatus.CONFLICT, "01000", "중복된 이메일 입니다."),
    NAME_DUPLICATION(HttpStatus.CONFLICT, "01001", "중복된 닉네임입니다."),

    // 서버 에러
    RUNTIME_EXCEPTION(HttpStatus.BAD_REQUEST, "00100"),
    ACCESS_DENIED_EXCEPTION(HttpStatus.UNAUTHORIZED, "00101"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "00102");
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
