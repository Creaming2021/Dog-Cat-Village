package donation.pet.domain.pet;

import donation.pet.domain.etc.Sex;
import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.dto.pet.PetRequestDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class PetTest {

    @Autowired
    ShelterRepository shelterRepository;

    @Autowired
    PetRepository petRepository;

    @Test
    public void 나이_계산() throws Exception {
        // given
        PetRequestDto dto = PetRequestDto.builder()
                .shelterId(3L)
                .name("쿠로")
                .sex(Sex.MALE)
                .weight(13.2f)
                .birthday("20210309")
                .personality("사람을 좋아함")
                .condition("다리가 짧음")
                .neuter(Neuter.YES)
                .breed("웰시 코기")
                .breedType(BreedType.DOG)
                .build();

        Shelter shelter = shelterRepository.findById(3L).get();

        // when
        Pet pet = Pet.createPet(dto, shelter);
        petRepository.save(pet);
        System.out.println(pet.getBirthday());

        System.out.println(pet.calculateAge());

        // then
    }
}