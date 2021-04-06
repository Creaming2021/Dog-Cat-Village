package donation.pet.service;

import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.exchange.Exchange;
import donation.pet.domain.exchange.ExchangeRepository;
import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.dto.exchange.ExchangeRequestDto;
import donation.pet.dto.exchange.ExchangeResponseDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ExchangeServiceTest {

    @Autowired
    ShelterRepository shelterRepository;

    @Autowired
    ExchangeService exchangeService;

    @Autowired
    ExchangeRepository exchangeRepository;

    @Test
    public void 환전_신청() throws Exception {
        // given
        Shelter shelter = shelterRepository.findByEmail("shelter@ssafy.com").get();
        ExchangeRequestDto dto = ExchangeRequestDto.builder()
                .receiptImage("test")
                .amount(10000)
                .description("그냥 만원 달라구요")
                .build();

        // when
        exchangeService.requestExchange(shelter.getId(), dto);

        // then
        Exchange exchange = exchangeRepository.findByShelterId(shelter.getId()).get();
        assertThat(exchange.getAmount()).isEqualTo(10000);
        assertThat(exchange.getAcceptStatus()).isEqualTo(AcceptStatus.PENDING);
        assertThat(shelter.getExchanges().size()).isEqualTo(1);
    }

    @Test
    public void 환전신청서_전체_출력() throws Exception {
        // given
        Shelter shelter = shelterRepository.findByEmail("shelter@ssafy.com").get();

        for (int i = 1; i <= 10; i++) {
            ExchangeRequestDto dto = ExchangeRequestDto.builder()
                    .receiptImage("test")
                    .amount(i * 10000)
                    .description("그냥 " + i + "만원 달라구요")
                    .build();

            exchangeService.requestExchange(shelter.getId(), dto);
        }

        // when
        ExchangeResponseDto exchangesAll = exchangeService.getExchangesAll();

        // then
        // 쿼리 한 번에 나가는지 테스트
        exchangesAll.getExchanges().forEach(exchangeDto -> System.out.println(exchangeDto.getShelter().getEmail()));
    }
}