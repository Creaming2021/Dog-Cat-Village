package donation.pet.service;

import donation.pet.domain.user.User;
import donation.pet.dto.user.DuplReqDto;
import donation.pet.dto.LoginReqDto;
import donation.pet.domain.user.UserRepository;
import donation.pet.dto.user.UserResDto;
import donation.pet.dto.user.UserSignupReqDto;
import donation.pet.exception.BaseException;
import donation.pet.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.net.URL;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final JavaMailSender javaMailSender;

    public UserResDto login(LoginReqDto dto) throws Exception {
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

    public void checkDuplicatedNickname(DuplReqDto dto) throws Exception {
        if(userRepository.findByNickname(dto.getNickname()).isPresent()) {
            throw new BaseException(ErrorCode.MEMBER_DUPLICATED_NICKNAME);
        }
    }

    public void signup(UserSignupReqDto dto) throws MessagingException {
        if(userRepository.findByEmail(dto.getEmail()).isPresent()){
            throw new BaseException(ErrorCode.MEMBER_DUPLICATED_EMAIL);
        }
        String acceptKey = getKey(false, 20);
        sendMail(dto.getEmail(), acceptKey);

        User user = User.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .nickname(dto.getNickname())
                .phone(dto.getPhone())
                .accept(acceptKey).build();
        user = userRepository.save(user);
    }

    public void checkEmailKey(String key, String email){
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


    // 메일 전송
    public void sendMail(String email, String key) {

        StringBuilder stringBuilder = new StringBuilder();

        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("noreply@bowmew.co.kr");
            messageHelper.setTo(email);
            messageHelper.setSubject("[멍냥커넥트]에서 도착한 이메일입니다.");
            URL url = new URL("http://localhost:8080/api/users/authentication/" + key + "/" + email);
            String content = stringBuilder.append("하단의 버튼으로 접속하여 인증해주세요.")
                    .append("\n").append("<a href='").append(url).append("'>")
                    .append("인증하기</a>")
                    .toString();
            messageHelper.setText(content, true);
        };
        javaMailSender.send(messagePreparator);

    }

    /* 난수 이용한 키 생성 */
    private boolean lowerCheck;
    private int size;

    public String getKey(boolean lowerCheck, int size){
        this.lowerCheck = lowerCheck;
        this.size = size;
        return init();
    }

    /* 이메일 난수 만드는 메소드 */
    private String init(){
        Random ran = new Random();
        StringBuffer sb = new StringBuffer();
        int num = 0;
        do {
            num = ran.nextInt(75) + 48;
            if ((num >= 48 && num <= 57)
                    || (num >= 65 && num <= 90)
                    || (num >= 97 && num <= 122)) {
                sb.append((char) num);
            } else {
                continue;
            }
        } while (sb.length() < size);
        if (lowerCheck) {
            return sb.toString().toLowerCase();
        }
        return sb.toString();
    }
}
