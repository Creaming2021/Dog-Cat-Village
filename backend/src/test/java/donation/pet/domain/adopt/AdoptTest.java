package donation.pet.domain.adopt;

import donation.pet.domain.center.Center;
import donation.pet.domain.center.CenterRepository;
import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.pet.PetRepository;
import donation.pet.domain.user.User;
import donation.pet.domain.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class AdoptTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CenterRepository centerRepository;

    @Autowired
    PetRepository petRepository;

    @BeforeEach
    public void beforeEach() {
        for (int i = 1; i <= 5; i++) {
            User user = User.builder()
                    .name("user" + i)
                    .build();
            userRepository.save(user);

            Center center = Center.builder()
                    .name("center" + i)
                    .build();
            centerRepository.save(center);

            Pet pet = Pet.createPet("pet" + i, center);
            petRepository.save(pet);
        }

    }

    @Test
    public void 유저가_입양신청() throws Exception {
        // given
        User user = userRepository.findById(1L).get();
        Pet pet = petRepository.findById(1L).get();
        Center center = centerRepository.findById(1L).get();

        // when
        Adopt adoptForUser = Adopt.createAdopt(user, pet, center);

        // then
        assertThat(adoptForUser.getUser()).isEqualTo(user);
        assertThat(adoptForUser.getPet()).isEqualTo(pet);
        assertThat(adoptForUser.getPet().getCenter()).isEqualTo(center);
        assertThat(adoptForUser.getAcceptStatus()).isEqualTo(AcceptStatus.PENDING);
    }
}