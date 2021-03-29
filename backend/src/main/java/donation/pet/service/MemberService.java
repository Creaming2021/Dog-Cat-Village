package donation.pet.service;

import donation.pet.domain.member.Member;
import donation.pet.domain.member.MemberRepository;
import donation.pet.domain.member.MemberRole;
import donation.pet.domain.member.consumer.Consumer;
import donation.pet.domain.member.consumer.ConsumerRepository;
import donation.pet.dto.consumer.ConsumerSignupRequestDto;
import donation.pet.dto.member.DuplRequestDto;
import donation.pet.dto.member.FindPasswordRequestDto;
import donation.pet.exception.BaseException;
import donation.pet.exception.ErrorCode;
import donation.pet.exception.RedirectCode;
import donation.pet.exception.RedirectException;
import donation.pet.util.MailUtil;
import donation.pet.util.MemberAdapter;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

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
        String token = mailUtil.sendauthenticateEmail(dto.getEmail());

        // todo 나중에 shelter도 가입 가능해야 함
        Consumer consumer = dto.toEntity(encodePassword, Set.of(MemberRole.USER), token);
        consumerRepository.save(consumer);
    }

    public void checkDuplicatedNickname(DuplRequestDto dto) {
        if (memberRepository.findByName(dto.getName()).isPresent()) {
            throw new BaseException(ErrorCode.NAME_DUPLICATION);
        }
    }

    public void findPassword(FindPasswordRequestDto dto) {
        Member member = memberRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

        String token = mailUtil.sendChangePassword(member.getEmail());
        member.updateTempLink(token);
    }

    public void test(Member member) {
        member.updateAccept("123123123123123123");
//        memberRepository.findById(member.getId()).get().updateAccept("AAAAAAAA");
    }

    public void checkEmailToken(String token) {
        Member member = memberRepository.findByAccept(token)
                .orElseThrow(() -> new RedirectException(RedirectCode.WRONG_EMAIL_CHECK));
        member.updateAccept("true");
    }

    // Security
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email));
        return new MemberAdapter(member);
    }
}
