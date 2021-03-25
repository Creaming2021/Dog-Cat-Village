package donation.pet.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import donation.pet.domain.center.Center;
import donation.pet.domain.center.CenterRepository;
import donation.pet.domain.pet.*;
import donation.pet.dto.pet.PetUpdateRequestDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PetControllerTest {

    @Autowired
    protected MockMvc mockMvc;

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
    public void 펫전체출력() throws Exception {
        mockMvc.perform(get("/pets")).andDo(print());
    }

    @Test
    public void 펫정보업데이트() throws Exception {
        // given
        PetUpdateRequestDto dto = PetUpdateRequestDto.builder()
                .centerId(1L).id(1L).name("쿠로").breed("웰시코기").weight(12.4f)
                .breedType(BreedType.DOG).personality("식탐이 강함").condition("돼지")
                .sex(Sex.MALE).neuter(Neuter.YES).adoptStatus(AdoptStatus.ADOPTED)
                .build();

        ObjectMapper mapper = new ObjectMapper();
        String jsonString = mapper.writeValueAsString(dto);

        // when
        System.out.println(jsonString);

        // then
        mockMvc.perform(put("/pets/1")
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }
}