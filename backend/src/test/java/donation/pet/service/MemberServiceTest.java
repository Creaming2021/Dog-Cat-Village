package donation.pet.service;

import donation.pet.domain.member.MemberRepository;
import donation.pet.domain.member.consumer.Consumer;
import donation.pet.domain.member.consumer.ConsumerRepository;
import donation.pet.dto.blockchain.BlockchainAddressDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class MemberServiceTest {

    @Autowired
    ConsumerRepository consumerRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberService memberService;

    @Autowired
    EntityManager em;

    @Test
    public void 거래주소_비밀키_리턴() throws Exception {
        // given
        Consumer consumer = Consumer.builder()
                .name("test0405")
                .email("toast@toast.t")
                .password("1234")
                .contractAddress("0x1233344")
                .privateKey("0x155cdft5tf")
                .build();
        consumerRepository.save(consumer);
        em.clear();

        // when
        Consumer findMember = consumerRepository.findByEmail(consumer.getEmail()).get();
        BlockchainAddressDto memberAddress = memberService.getMemberAddress(findMember.getId());

        // then
        System.out.println(memberAddress);
        assertThat(memberAddress.getContractAddress()).isEqualTo(consumer.getContractAddress());
        assertThat(memberAddress.getPrivateKey()).isEqualTo(consumer.getPrivateKey());
    }
}