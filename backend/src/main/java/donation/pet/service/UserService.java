package donation.pet.service;

import donation.pet.domain.user.User;
import donation.pet.dto.user.DuplReqDto;
import donation.pet.dto.LoginReqDto;
import donation.pet.domain.user.UserRepository;
import donation.pet.dto.user.UserResDto;
import donation.pet.dto.user.UserSignupReqDto;
import donation.pet.exception.BaseException;
import donation.pet.exception.ErrorCode;
import donation.pet.util.MailUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final MailUtil mailUtil;

    public UserResDto login(LoginReqDto dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new BaseException(ErrorCode.UNEXPECTED_USER));
        if(!user.getAccept().equals("true")) {
            throw new BaseException(ErrorCode.WRONG_EMAIL_CHECK_AUTH);
        }
        if(!user.getPassword().equals(dto.getPassword())) {
            throw new BaseException(ErrorCode.WRONG_PASSWORD);
        }
        UserResDto resDto = UserResDto.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .phone(user.getPhone()).build();
        return resDto;
    }

    public void checkDuplicatedNickname(DuplReqDto dto) {
        if(userRepository.findByNickname(dto.getNickname()).isPresent()) {
            throw new BaseException(ErrorCode.MEMBER_DUPLICATED_NICKNAME);
        }
    }

    public void signup(UserSignupReqDto dto) throws MessagingException {
        if(userRepository.findByEmail(dto.getEmail()).isPresent()){
            throw new BaseException(ErrorCode.MEMBER_DUPLICATED_EMAIL);
        }
        String acceptKey = mailUtil.getKey(false, 20);
        mailUtil.sendMail(dto.getEmail(), acceptKey);

        User user = User.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .nickname(dto.getNickname())
                .phone(dto.getPhone())
                .accept(acceptKey).build();
        user = userRepository.save(user);
    }

    public void checkEmailKey(String key, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BaseException(ErrorCode.UNEXPECTED_USER));
        if(user.getAccept().equals(key)){
            user = User.builder()
                    .id(user.getId())
                    .email(user.getEmail())
                    .password(user.getPassword())
                    .nickname(user.getNickname())
                    .phone(user.getPhone())
                    .accept("true").build();
            userRepository.save(user);
        }
    }

}
