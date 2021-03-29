package donation.pet.domain.pet;

import donation.pet.domain.center.Center;
import donation.pet.domain.center.CenterRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class PetTest {

    @Autowired
    PetRepository petRepository;

    @Autowired
    CenterRepository centerRepository;

    @Test
    public void 보호소의_펫등록() throws Exception {
        // given
        Center center = Center.builder()
                .name("centerA")
                .build();
        centerRepository.save(center);

        // when
        Pet pet = Pet.createPet("pet", center);
        petRepository.save(pet);

        Pet findPet = petRepository.findAll().get(0);

        // then
        assertThat(findPet).isEqualTo(pet);
        assertThat(findPet.getCenter()).isEqualTo(center);
        assertThat(pet.getAdoptStatus()).isEqualTo(AdoptStatus.UNADOPTED);
    }
}