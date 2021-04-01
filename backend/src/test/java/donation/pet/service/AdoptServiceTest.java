package donation.pet.service;

import donation.pet.domain.adopt.Adopt;
import donation.pet.domain.adopt.AdoptRepository;
import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.member.consumer.Consumer;
import donation.pet.domain.member.consumer.ConsumerRepository;
import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.pet.PetRepository;
import donation.pet.dto.adopt.AdoptDto;
import donation.pet.dto.adopt.AdoptResponseDto;
import donation.pet.dto.consumer.ConsumerResponseDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class AdoptServiceTest {

    @Autowired
    AdoptRepository adoptRepository;

    @Autowired
    AdoptService adoptService;

    @Autowired
    PetRepository petRepository;

    @Autowired
    ShelterRepository shelterRepository;

    @Autowired
    ConsumerRepository consumerRepository;

    @Test
    public void 오늘_입양_수_출력() throws Exception {
        // given
        for (int i = 0; i < 100; i++) {
            Pet pet = new Pet();
            Adopt adopt = Adopt.createAdopt(null, null, pet);
            adopt.changeAccept(AcceptStatus.ACCEPTED);
            petRepository.save(pet);
            adoptRepository.save(adopt);
        }

        Pet pet = new Pet();
        Adopt adopt = Adopt.createAdopt(null, null, pet);
        adopt.changeAccept(AcceptStatus.ACCEPTED);
        adopt.setStatusDate(LocalDate.now().minusDays(1));
        petRepository.save(pet);
        adoptRepository.save(adopt);

        // when
        int count = adoptRepository.findAll().size();
        int todayCount = (int) adoptRepository.countByAcceptStatusAndStatusDate(AcceptStatus.ACCEPTED, LocalDate.now());


        // then
        assertThat(count).as("요놈은 전체 갯수, 101개가 나와야한다").isEqualTo(101);
        assertThat(todayCount).as("오늘 입양된 수!, 100개가 나와야 한다.").isEqualTo(100);
    }

    @Test
    public void 연도별_월별_입양수() throws Exception {
        // given
        for (int i = 0; i < 12; i++) {
            for (int j = 0; j <= i; j++) {
                Adopt adopt = Adopt.createAdopt(null, null, null);
                adopt.setAcceptStatus(AcceptStatus.ACCEPTED);
                LocalDate statusDate = LocalDate.now().plusMonths(j);
                adopt.setStatusDate(statusDate);
                adoptRepository.save(adopt);
            }
        }

        // when
        int[] monthlyAdoption2020 = adoptService.getMonthlyPerCount(LocalDate.now().getYear())
                .getMonthlyAdoption();
        int[] monthlyAdoption2021 = adoptService.getMonthlyPerCount(LocalDate.now().plusYears(1).getYear())
                .getMonthlyAdoption();

        System.out.println(Arrays.toString(monthlyAdoption2020));
        System.out.println(Arrays.toString(monthlyAdoption2021));
        // then

    }

    @Test
    public void dto테스트() throws Exception {
        // given
        Consumer consumer = new Consumer();
        Shelter shelter = new Shelter();
        Pet pet = Pet.builder().name("쿠로").build();
        Adopt adopt = Adopt.createAdopt(consumer, shelter, pet);
        adopt.setName("다윤");
        consumerRepository.save(consumer);
        shelterRepository.save(shelter);
        petRepository.save(pet);
        adoptRepository.save(adopt);

        // when
        AdoptResponseDto adoptResponseDto = adopt.toAdoptDto();
        System.out.println("adoptResponseDto = " + adoptResponseDto);

        // then
    }
}