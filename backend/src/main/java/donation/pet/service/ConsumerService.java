package donation.pet.service;

import donation.pet.domain.member.MemberRepository;
import donation.pet.domain.member.MemberRole;
import donation.pet.domain.member.consumer.Consumer;
import donation.pet.domain.member.consumer.ConsumerRepository;
import donation.pet.dto.consumer.ConsumerResponseDto;
import donation.pet.dto.consumer.ConsumerSignupRequestDto;
import donation.pet.dto.member.DuplRequestDto;
import donation.pet.exception.BaseException;
import donation.pet.exception.ErrorCode;
import donation.pet.util.MailUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class ConsumerService {

    public final ConsumerRepository consumerRepository;
    public final MemberRepository memberRepository;
    public final ModelMapper modelMapper;
    public final PasswordEncoder passwordEncoder;
    public final MailUtil mailUtil;

    public void signup(ConsumerSignupRequestDto dto) {
        if (memberRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new BaseException(ErrorCode.EMAIL_DUPLICATION);
        }

        String encodePassword = passwordEncoder.encode(dto.getPassword());
        String key = mailUtil.sendMail(dto.getEmail());

        Consumer consumer = dto.toEntity(encodePassword, Set.of(MemberRole.USER), key);
        consumerRepository.save(consumer);
    }

    public void checkDuplicatedNickname(DuplRequestDto dto) {
        if (memberRepository.findByName(dto.getName()).isPresent()) {
            throw new BaseException(ErrorCode.NAME_DUPLICATION);
        }
    }

    public ConsumerResponseDto getConsumer(Long consumerId) {
        Consumer consumer = consumerRepository.findById(consumerId)
                .orElseThrow(() -> new BaseException(ErrorCode.CONSUMER_ID_NOT_EXIST));

        return null;
    }
}
