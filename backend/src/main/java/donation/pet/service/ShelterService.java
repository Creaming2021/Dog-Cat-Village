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

import static donation.pet.util.MailUtil.*;

@RequiredArgsConstructor
@Service
public class ShelterService {

    private final ShelterRepository shelterRepository;

    public ShelterResDto login(LoginReqDto dto) {
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

        Shelter shelter = Shelter.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .name(dto.getName())
                .phone(dto.getPhone())
                .accept(acceptKey).build();
        shelterRepository.save(shelter);
    }

    public void checkEmailKey(String key, String email) {
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
    
}
