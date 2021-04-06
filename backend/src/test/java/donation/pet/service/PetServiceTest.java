package donation.pet.service;

import donation.pet.domain.etc.Sex;
import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.domain.pet.BreedType;
import donation.pet.domain.pet.Neuter;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.pet.PetRepository;
import donation.pet.dto.pet.PetRequestDto;
import donation.pet.dto.pet.PetSimpleDto;
import donation.pet.exception.BaseException;
import donation.pet.exception.ErrorCode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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
//        Shelter shelter = Shelter.builder().name("보호소").build();
        Shelter shelter = shelterRepository.findById(3L)
                .orElseThrow(() -> new BaseException(ErrorCode.SHELTER_NOT_EXIST));
        for (int i = 0; i < 10; i++) {
            PetRequestDto dto = PetRequestDto.builder()
                    .shelterId(shelter.getId())
                    .name("쿠로").breed("웰시코기").weight(13.4f)
                    .birthday("20180207")
                    .breedType(BreedType.DOG).personality("식탐이 강함").condition("돼지")
                    .sex(Sex.MALE).neuter(Neuter.YES).build();
            Pet pet = Pet.createPet(dto, shelter);
            petRepository.save(pet);
        }
        shelterRepository.save(shelter);
    }

    @Test
    public void 전체출력() {
        petService.getPetAll().forEach(petSimpleDto -> {
            assertThat(petSimpleDto.getShelterName()).isEqualTo("보호소");
        });
    }

    @Test
    public void 나이계산() {
        Shelter shelter = shelterRepository.findById(3L).orElseThrow(() -> new BaseException(ErrorCode.SHELTER_NOT_EXIST));
        PetRequestDto dto = PetRequestDto.builder()
                .name("옥이강아지").birthday("20210406").sex(Sex.MALE)
                .breed("포메").neuter(Neuter.PLAN).condition("활발").shelterId(3L)
                .build();

        Pet pet = Pet.createPet(dto, shelter);
        String age = pet.calculateAge();
        System.out.println(">>>>>>>>>>>>>AGE>>>>>>>>>>     " + age);

    }


}