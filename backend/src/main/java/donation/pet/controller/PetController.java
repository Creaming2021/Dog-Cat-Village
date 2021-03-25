package donation.pet.controller;

import donation.pet.dto.pet.*;
import donation.pet.service.PetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pets")
public class PetController {

    private final PetService petService;

    @GetMapping
    public ResponseEntity<PetResponseListDto> getAllPets() {
        PetResponseListDto petResponseListDto = petService.getPetAll();

        return ResponseEntity.status(HttpStatus.OK).body(petResponseListDto);
    }

    @PostMapping
    public ResponseEntity<PetResponseDto> insertPet(@RequestBody PetPostRequestDto dto) {
        PetResponseDto result = petService.insertPet(dto);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/{petId}")
    public ResponseEntity<PetResponseDto> getPetById(@PathVariable("petId") Long petId) {
        PetResponseDto result = petService.getPetById(petId);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PutMapping("/{petId}")
    public ResponseEntity<PetDto> updatePetById(@PathVariable("petId") Long petId, @RequestBody PetUpdateRequestDto dto) {
        PetDto result = petService.updatePetById(petId, dto);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @DeleteMapping("/{petId}")
    public ResponseEntity<Void> deletePetById(@PathVariable("petId") Long petId) {
        petService.deletePetById(petId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
