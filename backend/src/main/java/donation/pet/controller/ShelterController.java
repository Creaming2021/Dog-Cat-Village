package donation.pet.controller;

import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.dto.adopt.AdoptListResponseDto;
import donation.pet.dto.adopt.AdoptResponseDto;
import donation.pet.dto.adopt.AdoptStatusDto;
import donation.pet.dto.pet.PetResponseListDto;
import donation.pet.dto.shelter.*;
import donation.pet.service.ShelterService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/shelters")
public class ShelterController {

    private final ShelterService shelterService;

    @ApiOperation("보호소 리스트")
    @GetMapping
    public ResponseEntity<ShelterListResponseDto> getAllShelters(){
        ShelterListResponseDto result = shelterService.getAllShelters();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation("보호소 마이페이지 유저 정보 요청")
    @GetMapping("/{shelterId}/profile")
    public ResponseEntity<ShelterResponseDto> getShelter(@PathVariable("shelterId") Long shelterId){
        ShelterResponseDto result = shelterService.getShelter(shelterId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation("보호소 마이페이지 유저 정보 수정")
    @PutMapping("/{shelterId}/profile")
    public ResponseEntity<ShelterResponseDto> updateShelter(@PathVariable("shelterId") Long shelterId,
                                        @RequestBody ShelterUpdateRequestDto dto){
        ShelterResponseDto result = shelterService.updateShelter(shelterId, dto);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation("보호소 메인 정보 요청")
    @GetMapping("/{shelterId}/main")
    public ResponseEntity<ShelterMainResponseDto> getShelterMain(@PathVariable("shelterId") Long shelterId){
        ShelterMainResponseDto result = shelterService.getShelterMain(shelterId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation("보호소 메인 정보 수정 요청")
    @PutMapping("/{shelterId}/main")
    public ResponseEntity<ShelterMainResponseDto> updateShelterMain(@PathVariable("shelterId") Long shelterId,
                                            @RequestBody ShelterMainRequestDto dto){
        ShelterMainResponseDto result = shelterService.updateShelterMain(shelterId, dto);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation("보호소 유저 이름 중복 확인")
    @PostMapping("/check")
    public ResponseEntity<Boolean> checkShelterName(@RequestBody ShelterNameDto dto) {
        boolean result = shelterService.checkShelterName(dto.getName());
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation("보호소 유저 프로필 이미지 등록")
    @PostMapping("/{shelterId}/image")
    public ResponseEntity<ShelterResponseDto> insertShelterImage(@PathVariable("shelterId") Long shelterId,
                                                                 @RequestParam MultipartFile file) {
        ShelterResponseDto result = shelterService.insertShelterImage(shelterId, file);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation("특정 보호소에 들어온 입양 신청 리스트 요청")
    @GetMapping("/{shelterId}/adopts")
    public ResponseEntity<AdoptListResponseDto> getAdoptsByShelter(@PathVariable("shelterId") Long shelterId){
        AdoptListResponseDto result = shelterService.getAdoptsByShelter(shelterId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation("입양 신청 디테일 정보 요청")
    @GetMapping("/{shelterId}/adopts/{adoptId}")
    public ResponseEntity<AdoptResponseDto> getAdopt(@PathVariable("shelterId") Long shelterId,
                                                     @PathVariable("adoptId") Long adoptId) {
        AdoptResponseDto result = shelterService.getAdopt(shelterId, adoptId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation("입양 신청 상태 변경 요청")
    @PutMapping("/{shelterId}/adopts/{adoptId}")
    public ResponseEntity<AdoptResponseDto> updateAdopt(@PathVariable("shelterId") Long shelterId,
                                                        @PathVariable("adoptId") Long adoptId,
                                                        @RequestBody AdoptStatusDto dto) {
        AdoptResponseDto result = shelterService.updateAdopt(shelterId, adoptId, dto);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation("특정 보호소 동물 리스트")
    @GetMapping("/{shelterId}/pets")
    public ResponseEntity<PetResponseListDto> getPetsByShelterId(@PathVariable("shelterId") Long shelterId) {
        PetResponseListDto result = shelterService.getPetsByShelterId(shelterId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
