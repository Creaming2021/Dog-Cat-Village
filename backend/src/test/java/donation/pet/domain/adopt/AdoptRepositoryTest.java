package donation.pet.domain.adopt;

import donation.pet.domain.member.consumer.Consumer;
import donation.pet.domain.member.consumer.ConsumerRepository;
import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.pet.PetRepository;
import donation.pet.dto.adopt.AdoptSimpleDto;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class AdoptRepositoryTest {

    @Autowired
    PetRepository petRepository;

    @Autowired
    AdoptRepository adoptRepository;

    @Autowired
    ShelterRepository shelterRepository;

    @Autowired
    ConsumerRepository consumerRepository;

    @Autowired
    ModelMapper modelMapper;

    @Test
    public void 페치조인쿼리테스트() throws Exception {
        // given
        Shelter shelter = new Shelter();
        Consumer consumer = new Consumer();
        for (int i = 0; i < 5; i++) {
            Pet pet = Pet.builder().name("동물" + i).build();
            Adopt adopt = Adopt.createAdopt(consumer, shelter, pet);
            petRepository.save(pet);
            adoptRepository.save(adopt);
        }
        shelterRepository.save(shelter);
        consumerRepository.save(consumer);

        // when
        List<Adopt> adopts = adoptRepository.findByShelter(shelter.getId());
        adopts.stream().map(adopt -> modelMapper.map(adopt, AdoptSimpleDto.class))
                .forEach(System.out::println);

        adoptRepository.findByConsumer(consumer.getId()).stream()
                .map(adopt -> modelMapper.map(adopt, AdoptSimpleDto.class))
                .forEach(System.out::println);

        // then
    }
}