package donation.pet.domain.adopt;

import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.member.consumer.Consumer;
import donation.pet.domain.member.consumer.ConsumerRepository;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.domain.pet.Pet;
import donation.pet.dto.adopt.AdoptMonthlyCountDto;
import donation.pet.service.AdoptService;
import donation.pet.service.ShelterService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
//@Rollback(value = false)
class AdoptTest {

    @Autowired
    ConsumerRepository consumerRepository;

    @Autowired
    ShelterRepository shelterRepository;

    @Autowired
    AdoptRepository adoptRepository;

    @Autowired
    AdoptService adoptService;

    @Test
    public void 연도별_월별_입양동물수() throws Exception {
        // given
        Consumer consumer = consumerRepository.findById(1L).get();
        shelterRepository.findAll().forEach(shelter -> {
            for (int i = 0; i < shelter.getPets().size(); i++) {
                if (i / 3 != 0) {
                    continue;
                }
                Pet pet = shelter.getPets().get(i);
                Adopt adopt = Adopt.createAdopt(consumer, shelter, pet);
                adopt.changeAccept(AcceptStatus.ACCEPTED);
                int minusMonth = (int) (Math.random() * 27 + 1); // 1년 12달 x 3 =36
                adopt.setStatusDate(LocalDate.now().minusMonths(minusMonth));
            }
        });

        // when

        for (int i = 0; i < 3; i++) {
            int year = 2021 - i;
            int[] monthlyAdoption = adoptService.getMonthlyPerCount(year).getMonthlyAdoption();
            System.out.println(year + "년 통계");
            System.out.println(Arrays.toString(monthlyAdoption));
        }
        // then
    }

    @Test
    public void 보호소별_입양_확인() throws Exception {
        // given
        shelterRepository.findAll().forEach(shelter -> {
            for (int i = 0; i < 3; i++) {
                int year = 2021 - i;
                int[] monthlyAdoption = shelter.getMonthlyAdoptionFromYear(year);
                System.out.println("보호소 이름: " + shelter.getName());
                System.out.println(year + "년 통계");
                System.out.println(Arrays.toString(monthlyAdoption));
            }
        });
        // when

        // then
    }
}