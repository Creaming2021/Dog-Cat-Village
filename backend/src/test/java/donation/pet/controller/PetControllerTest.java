package donation.pet.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import donation.pet.domain.etc.Sex;
import donation.pet.domain.pet.*;
import donation.pet.dto.pet.PetUpdateRequestDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PetControllerTest {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    PetRepository petRepository;

    @Test
    public void 펫전체출력() throws Exception {
        mockMvc.perform(get("/pets")).andDo(print());
    }

    @Test
    public void 펫정보업데이트() throws Exception {
        // given
        PetUpdateRequestDto dto = PetUpdateRequestDto.builder()
                .id(1L).name("쿠로").breed("웰시코기").weight(12.4f)
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