package donation.pet.controller;

import donation.pet.domain.pet.PetRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@AutoConfigureMockMvc
class CenterControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    PetRepository petRepository;


    @Test
    public void 보호소의_펫리스트() throws Exception {
        mockMvc.perform(get("/centers/1/pets"))
                .andDo(print());
    }

}