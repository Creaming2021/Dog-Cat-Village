package donation.pet.domain.member.shelter;

import donation.pet.domain.member.MemberRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(value = false)
class ShelterTest {

    @Autowired
    ShelterRepository shelterRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Test
    public void 보호소_더미데이터_생성() throws Exception {
        String[] shelters = { "러브하우스", "리본", "두잇보호소", "(주)싸피", "털보네 보호소", "도그러버", "캣맘", "가족같은보호소" };
        String[] introduces = {
                "유기동물들을 사랑합니다",
                "유기동물들이 새 삶을 얻길 바랍니다",
                "여러분의 한 걸음이 세상을 바꿉니다",
                "본 영상은 삼성청년소프트웨어 아카데미의 자산으로 무단으로 복제, 촬영, 공유 등을 금지합니다",
                "아버지의 마음으로 아이들을 돌보겠습니다",
                "강아지가 최고야",
                "고양이가 최고야",
                "가족같이 동물들을 대하겠습니다"
        };
        String[] phoneNumbers = { "01012324545", "01066849593", "01058673644", "01033296766", "01032967433", "01011134464", "01067867331", "01044576681" };
        String[] emails = {
                "love@love.com",
                "reborn@reborn.com",
                "doit@shelter.com",
                "ssafy@shelter.com",
                "beard@good.com",
                "doglover@dog.com",
                "catmom@cat.com",
                "family@like.com"
        };

        // given
        for (int i = 0; i < shelters.length; i++) {
            Shelter shelter = Shelter.builder()
                    .name(shelters[i])
                    .email(emails[i])
                    .introduce(introduces[i])
                    .password(passwordEncoder.encode("test"))
                    .accept("true")
                    .roles(Set.of(MemberRole.SHELTER))
                    .phoneNumber(phoneNumbers[i])
                    .build();

            shelterRepository.save(shelter);
        }

        // then
        int size = shelterRepository.findAll().size();
        System.out.println(size);
    }

}