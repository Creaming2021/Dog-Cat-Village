package donation.pet.domain.exchange;

import donation.pet.domain.center.Center;
import donation.pet.domain.center.CenterRepository;
import donation.pet.domain.etc.AcceptStatus;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ExchangeTest {

    @Autowired
    CenterRepository centerRepository;

    @Autowired
    ExchangeRepository exchangeRepository;

    @Test
    public void 보호소환전신청() throws Exception {
        // given
        Center center = Center.builder()
                .name("(주)SSAFY")
                .contractAddress("0x1123")
                .build();
        centerRepository.save(center);

        String transactionAddress = "0x123123123";
        String receiptImage = "receipt.jpg";

        // when
        Center findCenter = centerRepository.findAll().get(0);
        Exchange exchange = Exchange.createExchage(findCenter, receiptImage, transactionAddress);

        // then
        assertThat(findCenter.getExchanges().size())
                .as("1개 있어야 한다")
                .isEqualTo(1);
        assertThat(exchange.getAcceptStatus()).isEqualTo(AcceptStatus.PENDING);
        assertThat(exchange.getCenter()).isEqualTo(findCenter);
    }

    @Test
    public void 환전상태변경() throws Exception {
        // given
        Center center = Center.builder()
                .name("(주)SSAFY")
                .build();
        centerRepository.save(center);


        System.out.println("center 갯수: " + centerRepository.findAll().size());

        Center findCenter = centerRepository.findAll().get(0);
        Exchange exchange = Exchange.createExchage(findCenter, "", "");

        // when
        exchange.changeAcceptStatus(AcceptStatus.ACCEPTED);

        // then
        assertThat(exchange.getAcceptStatus()).isEqualTo(AcceptStatus.ACCEPTED);
        assertThat(center.getExchanges().get(0)).isEqualTo(exchange);
    }

}