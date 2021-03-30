package donation.pet.domain.member.consumer;

import donation.pet.domain.member.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ConsumerRepositoryTest {

    @Autowired
    ConsumerRepository consumerRepository;

    @Autowired
    MemberRepository memberRepository;

    @Test
    public void save() {
        // Given
        String email = "test@naver.com";
        String password = "ssafy";
        String name = "hello";

        Consumer consumer = Consumer.builder()
                .email(email)
                .password(password)
                .name(name)
                .roles(Set.of(MemberRole.CONSUMER))
                .build();

        // When
        consumerRepository.save(consumer);

        Consumer member = consumerRepository.findByEmail(email).orElse(null);

        System.out.println(member.getClass());

        // Then
        assertThat(member.getEmail()).isEqualTo(email);
        assertThat(member.getEmail()).isNotEqualTo("ssafy@naver.com");
    }
}