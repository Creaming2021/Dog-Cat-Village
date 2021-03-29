package donation.pet.exception;

import donation.pet.dto.exception.ExceptionDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RestControllerAdvice(annotations = RestController.class)
public class ExceptionAdvice {

    // CustomException
    @ExceptionHandler({BaseException.class})
    public ResponseEntity<ExceptionDto> exceptionHandler(BaseException e) {
        return ResponseEntity
                .status(e.getErrorCode().getStatus())
                .body(ExceptionDto.builder()
                        .errorCode(e.getErrorCode().getCode())
                        .errorMessage(e.getErrorCode().getMessage())
                        .build());
    }


    // RunTimeException
    @ExceptionHandler({RuntimeException.class})
    public ResponseEntity<ExceptionDto> exceptionHandler(RuntimeException e) {
        e.printStackTrace();
        return ResponseEntity
                .status(ErrorCode.RUNTIME_EXCEPTION.getStatus())
                .body(ExceptionDto.builder()
                        .errorCode(ErrorCode.RUNTIME_EXCEPTION.getCode())
                        .errorMessage(e.getMessage())
                        .build());
    }

    // AccessDeniedException
    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<ExceptionDto> exceptionHandler(AccessDeniedException e) {
        e.printStackTrace();
        return ResponseEntity
                .status(ErrorCode.ACCESS_DENIED_EXCEPTION.getStatus())
                .body(ExceptionDto.builder()
                        .errorCode(ErrorCode.ACCESS_DENIED_EXCEPTION.getCode())
                        .errorMessage(e.getMessage())
                        .build());
    }

    // 그외 Exception
    @ExceptionHandler({Exception.class})
    public ResponseEntity<ExceptionDto> exceptionHandler(Exception e) {
        e.printStackTrace();
        return ResponseEntity
                .status(ErrorCode.INTERNAL_SERVER_ERROR.getStatus())
                .body(ExceptionDto.builder()
                        .errorCode(ErrorCode.INTERNAL_SERVER_ERROR.getCode())
                        .errorMessage(e.getMessage())
                        .build());
    }
}
