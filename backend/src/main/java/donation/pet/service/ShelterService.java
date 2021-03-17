package donation.pet.service;

import donation.pet.domain.shelter.Shelter;
import donation.pet.domain.shelter.ShelterRepository;
import donation.pet.dto.LoginReqDto;
import donation.pet.dto.shelter.ShelterResDto;
import donation.pet.dto.shelter.ShelterSignupReqDto;
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
public class ShelterService {

    private final ShelterRepository shelterRepository;
    private final JavaMailSender javaMailSender;

    public ShelterResDto login(LoginReqDto dto){
        Shelter shelter = shelterRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new BaseException(ErrorCode.UNEXPECTED_USER));
        if(!shelter.getAccept().equals("true")){
            throw new BaseException(ErrorCode.WRONG_EMAIL_CHECK_AUTH);
        }
        if(!shelter.getPassword().equals(dto.getPassword())) {
            throw new BaseException(ErrorCode.WRONG_PASSWORD);
        }
        ShelterResDto resDto = ShelterResDto.builder()
                .email(shelter.getEmail())
                .name(shelter.getName())
                .phone(shelter.getPhone())
                .build();
        return resDto;
    }

    public void signup(ShelterSignupReqDto dto) throws MessagingException {
        if(shelterRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new BaseException(ErrorCode.MEMBER_DUPLICATED_EMAIL);
        }
        String acceptKey = getKey(false, 20);
        sendMail(dto.getEmail(), acceptKey);

        // toEntity 활용으로 바꾸기
        Shelter shelter = Shelter.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .name(dto.getName())
                .phone(dto.getPhone())
                .accept(acceptKey).build();
        shelter = shelterRepository.save(shelter);
    }

    public void checkEmailKey(String key, String email){
        Shelter shelter = shelterRepository.findByEmail(email)
                .orElseThrow(() -> new BaseException(ErrorCode.UNEXPECTED_USER));
        if(shelter.getAccept().equals(key)){
            shelter = Shelter.builder()
                    .id(shelter.getId())
                    .email(shelter.getEmail())
                    .name(shelter.getName())
                    .phone(shelter.getPhone())
                    .accept("true").build();
            shelterRepository.save(shelter);
        }
    }

    // 메일 전송
    public void sendMail(String email, String key) throws MessagingException {

        StringBuilder stringBuilder = new StringBuilder();

        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("noreply@bowmew.co.kr");
            messageHelper.setTo(email);
            messageHelper.setSubject("[멍냥커넥트]에서 도착한 이메일입니다.");
            URL url = new URL("http://localhost:8080/api/users/shelters/authentication/" + key + "/" + email);
            String content = stringBuilder.append("하단의 링크로 접속하여 인증해주세요.")
                    .append("\n")
                    .append(url)
                    .toString();
            messageHelper.setText(content, true);
        };
        javaMailSender.send(messagePreparator);

    }
    
    // UserService와 중복
    
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
