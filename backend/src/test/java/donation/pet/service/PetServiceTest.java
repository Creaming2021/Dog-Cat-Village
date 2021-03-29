package donation.pet.service;

import donation.pet.domain.center.Center;
import donation.pet.domain.center.CenterRepository;
import donation.pet.domain.pet.*;
import donation.pet.dto.pet.PetDto;
import donation.pet.dto.pet.PetPostRequestDto;
import donation.pet.dto.pet.PetResponseDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class PetServiceTest {

    @Autowired
    PetService petService;

    @Autowired
    CenterRepository centerRepository;

    @Autowired
    PetRepository petRepository;

    @Autowired
    ModelMapper modelMapper;

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
        Pet pet = petRepository.findAll().get(0);
        PetDto map = modelMapper.map(pet, PetDto.class);

        Pet pet1 = modelMapper.map(map, Pet.class);

        // when


        // then
        assertThat(map.getName()).isEqualTo(pet.getName());
        assertThat(pet1.getName()).isEqualTo(pet.getName());
    }

    @Test
    public void insertPet() throws Exception {
        // given
        Center center = new Center();
        centerRepository.save(center);

        PetPostRequestDto dto = PetPostRequestDto.builder()
                .centerId(1L).name("쿠로").breed("웰시코기").weight(12.4f)
                .breedType(BreedType.DOG).personality("식탐이 강함").condition("돼지")
                .sex(Sex.MALE).neuter(Neuter.YES)
                .build();

        // when
        PetResponseDto petResponseDto = petService.insertPet(dto);

        // then
        assertThat(petResponseDto.getName()).isEqualTo("쿠로");
    }

}