package donation.pet.service;

import donation.pet.domain.adopt.Adopt;
import donation.pet.domain.adopt.AdoptRepository;
import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.member.consumer.Consumer;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.pet.PetRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.parameters.P;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class AdoptServiceTest {

    @Autowired
    AdoptRepository adoptRepository;

    @Autowired
    PetRepository petRepository;

    @BeforeEach
    public void before() {
        for (int i = 0; i < 100; i++) {
            Adopt adopt = new Adopt();
            Pet pet = new Pet();
            adopt.setPet(pet);
            adopt.changeAccept(AcceptStatus.ACCEPTED);
            adoptRepository.save(adopt);
            petRepository.save(pet);
        }
    }

    @Test
    public void 오늘_입양_수_출력() throws Exception {
        // given
        Adopt adopt = new Adopt();
        Pet pet = new Pet();
        adopt.setPet(pet);
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
}