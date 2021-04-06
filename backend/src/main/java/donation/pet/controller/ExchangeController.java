package donation.pet.controller;

import donation.pet.dto.exchange.ExchangeAcceptStatusDto;
import donation.pet.dto.exchange.ExchangeDto;
import donation.pet.dto.exchange.ExchangeRequestDto;
import donation.pet.dto.exchange.ExchangeResponseDto;
import donation.pet.service.ExchangeService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exchange")
@RequiredArgsConstructor
public class ExchangeController {

    private final ExchangeService exchangeService;

    @ApiOperation("보호소 환전 신청")
    @PostMapping("/shelter/{shelterId}")
    public ResponseEntity<Void> requestExchange(@PathVariable("shelterId") Long shelterId,
                                          @RequestBody ExchangeRequestDto dto) {
        exchangeService.requestExchange(shelterId, dto);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @ApiOperation("관리자 환전 수락 여부 응답")
    @PutMapping("/{exchangeId}")
    public ResponseEntity<Void> checkExchange(@PathVariable("exchangeId") Long exchangeId,
                                              @RequestBody ExchangeAcceptStatusDto dto) {
        // 성공인 경우 프론트에서 미리 트랜잭션 보내고 백엔드와 통신
        exchangeService.checkExchange(exchangeId, dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation("환전 신청 내역서 전체 출력")
    @GetMapping
    public ResponseEntity<ExchangeResponseDto> getExchangesAll() {
        ExchangeResponseDto result = exchangeService.getExchangesAll();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation("해당 보호소의 환전 신청 내역서 출력")
    @GetMapping("/shelter/{shelterId}")
    public ResponseEntity<ExchangeResponseDto> getExchange(@PathVariable("shelterId") Long shelterId) {
        ExchangeResponseDto result = exchangeService.getExchange(shelterId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
