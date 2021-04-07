package donation.pet.controller;

import donation.pet.domain.member.MemberRole;
import donation.pet.domain.member.consumer.Consumer;
import donation.pet.domain.member.consumer.ConsumerRepository;
import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.dto.consumer.MemberSignupRequestDto;
import donation.pet.exception.BaseException;
import donation.pet.service.MemberService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@Rollback
class MemberControllerTest {

    @Autowired
    MemberService memberService;

    @Autowired
    ConsumerRepository consumerRepository;

    @Autowired
    ShelterRepository shelterRepository;

    @Test
    public void 사용자_회원가입() throws Exception {
        MemberSignupRequestDto dto = MemberSignupRequestDto.builder()
//                .memberRole(MemberRole.CONSUMER)
                .email("meloncha0205@gmail.com")
                .password("test")
                .name("멜론")
                .phoneNumber("01012345678")
                .build();

        memberService.signup(dto);

        Consumer consumer = consumerRepository.findByEmail(dto.getEmail()).get();
        assertThat(consumer.getName()).isEqualTo(dto.getName());
    }

    @Test
    public void 사용자_중복_이름_회원가입() throws Exception {
        MemberSignupRequestDto dto = MemberSignupRequestDto.builder()
//                .memberRole(MemberRole.CONSUMER)
                .email("test2@test.com")
                .password("test")
                .name("김싸피")
                .phoneNumber("01012345678")
                .build();

        assertThatThrownBy(() -> memberService.signup(dto))
                .isInstanceOf(BaseException.class);
    }

    @Test
    public void 보호소_회원가입() throws Exception {
        MemberSignupRequestDto dto = MemberSignupRequestDto.builder()
//                .memberRole(MemberRole.SHELTER)
                .email("test3@test.com")
                .password("test")
                .name("(주)싸피")
                .phoneNumber("01012345678")
                .build();

        memberService.signup(dto);

        Shelter shelter = shelterRepository.findByEmail(dto.getEmail()).get();
        assertThat(shelter.getName()).isEqualTo(dto.getName());
    }
}