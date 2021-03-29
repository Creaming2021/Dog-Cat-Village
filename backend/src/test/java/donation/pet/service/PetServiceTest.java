package donation.pet.service;

import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.pet.PetRepository;
import donation.pet.dto.pet.PetRequestDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class PetServiceTest {

    @Autowired
    ShelterRepository shelterRepository;

    @Autowired
    PetRepository petRepository;

    @Autowired
    PetService petService;

    @Autowired
    ModelMapper modelMapper;

    @BeforeEach
    public void before() {
        Shelter shelter = Shelter.builder().name("보호소").build();
        for (int i = 0; i < 10; i++) {
            PetRequestDto dto = new PetRequestDto();
            dto.setName("호랑이" + i);
            Pet pet = Pet.createPet(dto, shelter);
            petRepository.save(pet);
        }
        shelterRepository.save(shelter);
    }

    @Test
    public void 전체출력() {
        petService.getPetAll().getPets().forEach(petSimpleDto -> {
            assertThat(petSimpleDto.getShelterName()).isEqualTo("보호소");
        });
    }

}