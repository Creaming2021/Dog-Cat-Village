package donation.pet.controller;

import donation.pet.dto.pet.*;
import donation.pet.service.PetService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pets")
public class PetController {

    private final PetService petService;

    @ApiOperation("반려동물 전체 조회")
    @GetMapping
    public ResponseEntity<PetResponseListDto> getAllPets() {
        PetResponseListDto petResponseListDto = petService.getPetAll();
        return ResponseEntity.status(HttpStatus.OK).body(petResponseListDto);
    }

    @ApiOperation("반려동물 저장")
    @PostMapping
    public ResponseEntity<Void> insertPet(@RequestBody PetRequestDto dto) {
        petService.insertPet(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation("해당 반려 동물 조회")
    @GetMapping("/{petId}")
    public ResponseEntity<PetDto> getPetById(@PathVariable("petId") Long petId) {
        PetDto result = petService.getPetById(petId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation("해당 반려 동물 수정")
    @PutMapping("/{petId}")
    public ResponseEntity<PetDto> updatePetById(@PathVariable("petId") Long petId, @RequestBody PetRequestDto dto) {
        PetDto result = petService.updatePetById(petId, dto);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation("해당 반려 동물 제거(DB 제거 아님)")
    @DeleteMapping("/{petId}")
    public ResponseEntity<Void> deletePetById(@PathVariable("petId") Long petId) {
        petService.deletePetById(petId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation("반려 동물 이미지 삽입")
    @PostMapping("/{petId}/image")
    public ResponseEntity<Void> updatePetImage(@PathVariable("petId") Long petId,
                                               @RequestBody MultipartFile file) {
        petService.updatePetImage(petId, file);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

}
