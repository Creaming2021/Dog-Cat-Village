package donation.pet.service;

import donation.pet.domain.member.Member;
import donation.pet.domain.member.MemberRepository;
import donation.pet.domain.member.MemberRole;
import donation.pet.domain.member.consumer.Consumer;
import donation.pet.domain.member.consumer.ConsumerRepository;
import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.dto.consumer.MemberSignupRequestDto;
import donation.pet.dto.member.*;
import donation.pet.exception.BaseException;
import donation.pet.exception.ErrorCode;
import donation.pet.exception.RedirectCode;
import donation.pet.exception.RedirectException;
import donation.pet.util.ConnectOauth;
import donation.pet.util.MailUtil;
import donation.pet.util.MemberAdapter;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Set;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

    public final ConsumerRepository consumerRepository;
    public final ShelterRepository shelterRepository;
    public final MemberRepository memberRepository;
    public final ModelMapper modelMapper;
    public final PasswordEncoder passwordEncoder;
    public final MailUtil mailUtil;
    public final ConnectOauth connectOauth;

    // 회원가입
    @Async
    @Transactional
    public void signup(MemberSignupRequestDto dto) {
        // 이메일 중복 확인
        if (memberRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new BaseException(ErrorCode.EMAIL_DUPLICATION);
        }
        // 이름 중복 확인
        if (memberRepository.findByName(dto.getName()).isPresent()) {
            throw new BaseException(ErrorCode.NAME_DUPLICATION);
        }

        String encodePassword = passwordEncoder.encode(dto.getPassword());
        String token = mailUtil.sendAuthenticateEmail(dto.getEmail());

        // MemberRole 에 따라 다르게 회원가입
        if (dto.getMemberRole() == MemberRole.CONSUMER) {
            Consumer consumer = dto.toConsumer(encodePassword, Set.of(MemberRole.CONSUMER), token);
            consumerRepository.save(consumer);
        } else if (dto.getMemberRole() == MemberRole.SHELTER) {
            Shelter shelter = dto.toShelter(encodePassword, Set.of(MemberRole.SHELTER), token);
            shelterRepository.save(shelter);
        } else {
            // MemberRole 에 의미 없는 값이 들어올 경우
            throw new BaseException(ErrorCode.MEMBER_ROLE_NOT_EXIST);
        }
    }

    // 닉네임 중복 확인
    public void checkDuplicatedNickname(DuplRequestDto dto) {
        if (memberRepository.findByName(dto.getName()).isPresent()) {
            throw new BaseException(ErrorCode.NAME_DUPLICATION);
        }
    }

    // 이메일 인증
    @Transactional
    public void checkEmailToken(String token) {
        Member member = memberRepository.findByAccept(token)
                .orElseThrow(() -> new RedirectException(RedirectCode.WRONG_EMAIL_CHECK));
        member.updateAccept("true");
    }

    // 로그인
    public LoginResponseDto login(LoginRequestDto dto) {
        LoginResponseDto loginResponseDto = connectOauth.loginCheck(dto);
        Member member = memberRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));
        if (!member.getAccept().equals("true")) {
            throw new BaseException(ErrorCode.WRONG_EMAIL_CHECK_AUTH);
        }
        return loginResponseDto;
    }

    // 패스워드 찾기
    @Async
    @Transactional
    public void forgetPassword(FindPasswordRequestDto dto) {
        Member member = memberRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));
        String token = mailUtil.sendChangePassword(member.getEmail());
        member.updateTempLink(token);
    }

    // 비밀번호 변경 링크 리다이렉트
    @Transactional
    public void makeChangeLink(String token) {
        Member member = memberRepository.findByTempLink(token)
                .orElseThrow(() -> new RedirectException(RedirectCode.MEMBER_NOT_FOUND));
        if (member.getTempLink().equals("none") ||
                LocalDateTime.now().isAfter(member.getTempLinkDate().plusDays(1))) {
            member.updateTempLink("none");
            throw new RedirectException(RedirectCode.EXPIRE_PASSWORD_LINK);
        }
    }

    // 비밀번호 변경 링크를 통한 변경
    @Transactional
    public void changeLinkPassword(PasswordRequestDto dto, String token) {
        Member member = memberRepository.findByTempLink(token)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));
        if (member.getTempLink().equals("none")) {
            throw new BaseException(ErrorCode.PASSWORD_NOT_FORGOT);
        }
        if (LocalDateTime.now().isAfter(member.getTempLinkDate().plusDays(1))) {
            throw new BaseException(ErrorCode.EXPIRE_PASSWORD_LINK);
        }
        member.updateTempLink("none");
        member.updatePassword(passwordEncoder.encode(dto.getPassword()));
    }

    // Security
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email));
        return new MemberAdapter(member);
    }
}
