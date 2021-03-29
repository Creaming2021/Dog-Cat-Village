package donation.pet.service;

import donation.pet.domain.adopt.Adopt;
import donation.pet.domain.adopt.AdoptRepository;
import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.dto.adopt.AdoptTodayDto;
import donation.pet.dto.shelter.ShelterResponseDto;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ShelterServiceTest {

    @Autowired
    AdoptRepository adoptRepository;
    @Autowired
    AdoptService adoptService;
    @Autowired
    ShelterService shelterService;
    @Autowired
    ShelterRepository shelterRepository;

    @Test
    public void 보호소_입양수_연도별_월별_정렬() throws Exception {
        // given
        Shelter shelter = new Shelter();
        for (int i = 0; i < 12; i++) {
            for (int j = 0; j <= i; j++) {
                Adopt adopt = Adopt.createAdopt(null, shelter, null);
                adopt.setAcceptStatus(AcceptStatus.ACCEPTED);
                LocalDate statusDate = LocalDate.now().plusMonths(j);
                adopt.setStatusDate(statusDate);
                adoptRepository.save(adopt);
            }
        }
        shelterRepository.save(shelter);

        // when
        AdoptTodayDto todayAdoption = adoptService.getTodayAdoption();
        System.out.println("todayAdoption.getTodayAdoptedPetCount() = " + todayAdoption.getTodayAdoptedPetCount());

        ShelterResponseDto findShelter = shelterService.getShelter(shelter.getId());
        System.out.println(Arrays.toString(findShelter.getMonthlyAdoption()));

        // then
        assertThat(findShelter.getMonthlyAdoption()[2]).isEqualTo(todayAdoption.getTodayAdoptedPetCount());
    }

}