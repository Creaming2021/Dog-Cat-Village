package donation.pet.service;

import donation.pet.dto.blockchain.BlockchainTransactionListDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BlockchainServiceTest {

    @Autowired
    BlockchainService blockchainService;

    @Test
    public void REST_TEMPLATE_테스트() throws Exception {
        // given
        String address = "0xA9e4f0d5332b26C9B323cC299604D001dA25db1B";

        // when
        BlockchainTransactionListDto transactionList = blockchainService.getTransactionList(address);
        System.out.println(transactionList);
        // then
    }
}