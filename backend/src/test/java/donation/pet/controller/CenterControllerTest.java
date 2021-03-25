package donation.pet.controller;

import donation.pet.domain.center.Center;
import donation.pet.domain.center.CenterRepository;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.pet.PetRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@AutoConfigureMockMvc
class CenterControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    CenterRepository centerRepository;

    @Autowired
    PetRepository petRepository;

    @BeforeEach
    public void beforeEach() {
        Center center = Center.builder()
                .name("center")
                .build();
        centerRepository.save(center);

        for (int i = 1; i <= 5; i++) {

            Pet pet = Pet.createPet("pet" + i, center);
            petRepository.save(pet);
        }
    }

    @Test
    public void 보호소의_펫리스트() throws Exception {
        mockMvc.perform(get("/centers/1/pets"))
                .andDo(print());
    }

}