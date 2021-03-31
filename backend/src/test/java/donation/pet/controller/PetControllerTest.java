package donation.pet.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import donation.pet.domain.etc.Sex;
import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.domain.pet.*;
import donation.pet.dto.pet.PetRequestDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PetControllerTest {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    PetRepository petRepository;

    @Autowired
    ShelterRepository shelterRepository;

    @Test
    public void 펫전체출력() throws Exception {
        mockMvc.perform(get("/pets")).andDo(print());
    }

    @Test
    public void 펫저장() throws Exception {
        // given
        Shelter shelter = new Shelter();
        shelterRepository.save(shelter);
        System.out.println(shelter.getId());

        PetRequestDto dto = PetRequestDto.builder()
                .shelterId(shelter.getId())
                .name("쿠로").breed("웰시코기").weight(12.4f)
                .breedType(BreedType.DOG).personality("식탐이 강함").condition("돼지")
                .sex(Sex.MALE).neuter(Neuter.YES).build();
        ObjectMapper mapper = new ObjectMapper();
        String jsonString = mapper.writeValueAsString(dto);

        // when
        System.out.println(jsonString);

        // then
        mockMvc.perform(post("/pets")
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }
}