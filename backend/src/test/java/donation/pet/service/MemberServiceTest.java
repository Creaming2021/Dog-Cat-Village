package donation.pet.service;

import donation.pet.domain.member.Member;
import donation.pet.domain.member.MemberRepository;
import donation.pet.dto.consumer.ConsumerSignupRequestDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class MemberServiceTest {

    @Autowired
    MemberService memberService;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    MemberRepository memberRepository;

    @Test
    public void signupTest() {

//        ModelMapper modelMapper = new ModelMapper();
        // Given
        String email = "ssafy@naver.com";
        String password = "ssafy";
        String name = "ssafy";
        String phoneNumber = "01000000000";
        ConsumerSignupRequestDto dto = ConsumerSignupRequestDto.builder()
                .email(email)
                .password(password)
                .name(name)
                .phoneNumber(phoneNumber)
                .build();

//        Optional<Member> member = memberRepository.findByEmail("admin@ssafy.com");
//        MemberSignupRequestDto map = modelMapper.map(member, MemberSignupRequestDto.class);

        // When
        Member member = modelMapper.map(dto, Member.class);

        // Then
        assertThat(dto.getEmail()).isEqualTo(email);
        assertThat(member.getEmail()).isEqualTo(email);
    }
}