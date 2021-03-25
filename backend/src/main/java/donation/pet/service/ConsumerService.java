package donation.pet.service;

import donation.pet.domain.member.MemberRepository;
import donation.pet.domain.member.consumer.Consumer;
import donation.pet.dto.consumer.ConsumerSignupRequestDto;
import donation.pet.dto.consumer.ConsumerSignupResponseDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ConsumerService {

    public final MemberRepository memberRepository;
    public final ModelMapper modelMapper;
    public final PasswordEncoder passwordEncoder;

    public ConsumerSignupResponseDto signup(ConsumerSignupRequestDto consumerSignupRequestDto) {

        if (memberRepository.findByEmail(consumerSignupRequestDto.getEmail()).isPresent()) {
            // 이메일 중복
        }

//        String encodePassword = passwordEncoder.encode(member.getPassword());
//        member.signup(encodePassword, memberSignupRequestDto.getRole());
//        memberRepository.save(member);

        // TODO 메일 인증 NullPointException
        // 메일 보내기
//        String key = mailUtil.sendMail(user.getEmail());
//        member.updateAccept(key);
//        member.updateAccept("true");
        return null;
//        return new MemberSignupResponseDto(member.getId());
    }

    public void signup(Consumer consumer) {
        if (memberRepository.findByEmail(consumer.getEmail()).isEmpty()) {
            consumer.updatePassword(passwordEncoder.encode(consumer.getPassword()));
            memberRepository.save(consumer);
        }
    }
}
