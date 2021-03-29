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
    public ResponseEntity<Void> insertPet(@RequestBody PetRequestDto dto) {
        petService.insertPet(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{petId}")
    public ResponseEntity<PetDto> getPetById(@PathVariable("petId") Long petId) {
        PetDto result = petService.getPetById(petId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PutMapping("/{petId}")
    public ResponseEntity<PetDto> updatePetById(@PathVariable("petId") Long petId, @RequestBody PetRequestDto dto) {
        PetDto result = petService.updatePetById(petId, dto);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @DeleteMapping("/{petId}")
    public ResponseEntity<Void> deletePetById(@PathVariable("petId") Long petId) {
        petService.deletePetById(petId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
