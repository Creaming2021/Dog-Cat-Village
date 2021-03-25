package donation.pet.service;

import donation.pet.domain.center.Center;
import donation.pet.domain.center.CenterRepository;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.pet.PetRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class PetServiceTest {

    @Autowired
    PetService petService;

    @Autowired
    CenterRepository centerRepository;

    @Autowired
    PetRepository petRepository;

    @BeforeEach
    public void beforeEach() {
        for (int i = 1; i <= 5; i++) {

            Center center = Center.builder()
                    .name("center" + i)
                    .build();
            centerRepository.save(center);

            Pet pet = Pet.createPet("pet" + i, center);
            petRepository.save(pet);
        }

    }


    @Test
    public void 모델매퍼_테스트() throws Exception {
        // given


        // when

        // then
    }

}