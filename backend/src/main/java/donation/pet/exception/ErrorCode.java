package donation.pet.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
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

    // Member
    EMAIL_DUPLICATION(HttpStatus.CONFLICT, "01000", "중복된 이메일"),
    NAME_DUPLICATION(HttpStatus.CONFLICT, "01001", "중복된 닉네임"),
    LOGIN_FAIL(HttpStatus.UNAUTHORIZED, "01002", "로그인 실패"),
    WRONG_EMAIL_CHECK_AUTH(HttpStatus.UNAUTHORIZED, "01003", "이메일 인증 미실시"),
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "01004", "없는 계정"),
    EXPIRE_PASSWORD_LINK(HttpStatus.NOT_FOUND, "01005", "비밀번호 변경 링크 만료"),
    PASSWORD_NOT_FORGOT(HttpStatus.UNAUTHORIZED, "01006", "비밀번호 변경 요청 안함"),
    MEMBER_ROLE_NOT_EXIST(HttpStatus.NOT_FOUND, "01007", "잘못된 사용자 역할"),
    MEMBER_NOT_ALLOWED(HttpStatus.UNAUTHORIZED, "01008", "사용자 정보 다름, 권한 없는 요청"),

    // Consumer
    CONSUMER_NOT_EXIST(HttpStatus.NOT_FOUND, "02000", "존재하지 않는 사용자입니다."),
    CONSUMER_NOT_MATCH(HttpStatus.BAD_REQUEST, "02001", "해당 사용자의 입양신청서가 아닙니다."),

    // Shelter
    SHELTER_NOT_EXIST(HttpStatus.NOT_FOUND, "03000", "존재하지 않는 보호소입니다."),
    SHELTER_NOT_MATCH(HttpStatus.BAD_REQUEST, "03001", "해당 보호소의 입양신청서가 아닙니다."),

    // Adopt
    ADOPT_NOT_EXIST(HttpStatus.NOT_FOUND, "04000", "존재하지 않는 신청서입니다."),

    // Pet
    PET_NOT_EXIST(HttpStatus.NOT_FOUND, "05000", "존재하지 않는 동물입니다."),
    PET_NOT_MATCH(HttpStatus.BAD_REQUEST, "05001", "동물 아이디가 서로 다릅니다."),

    // Exchange
    EXCHANGE_NOT_EXIST(HttpStatus.NOT_FOUND, "06000", "존재하지 않는 환전신청서입니다."),



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
}
