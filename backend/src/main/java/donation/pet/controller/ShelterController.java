package donation.pet.controller;

import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.dto.shelter.ShelterResponseDto;
import donation.pet.service.ShelterService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/shelters")
public class ShelterController {

    private final ShelterService shelterService;

    @ApiOperation("보호소 리스트")
    @GetMapping
    public ResponseEntity getAllShelters(){
        shelterService.getAllShelters();
        return null;
    }

    @ApiOperation("보호소 유저 정보")
    @GetMapping("/{shelterId}")
    public ResponseEntity<ShelterResponseDto> func2(@PathVariable("shelterId") Long shelterId){
        ShelterResponseDto result = shelterService.getShelter(shelterId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation("보호소 유저 정보 수정")
    @PutMapping("/{shelterId}")
    public ResponseEntity func3(@PathVariable("shelterId") Long shelterId){
        return null;
    }

    @ApiOperation("특정 보호소에 들어온 입양 신청 리스트 요청")
    @GetMapping("/{shelterId}/adopts")
    public ResponseEntity func4(@PathVariable("shelterId") Long shelterId){
        return null;
    }

    @ApiOperation("입양 신청 디테일 정보 요청")
    @GetMapping("/{shelterId}/adopts/{adoptId}")
    public ResponseEntity func5(@PathVariable("shelterId") Long shelterId, @PathVariable("adoptId") Long adoptId){
        return null;
    }

    @ApiOperation("입양 신청 상태 변경 요청")
    @PutMapping("/{shelterId}/adopts/{adoptId}")
    public ResponseEntity func6(@PathVariable("shelterId") Long shelterId, @PathVariable("adoptId") Long adoptId){
        return null;
    }

    @ApiOperation("특정 보호소 동물 리스트")
    @GetMapping("/{shelterId}/pets")
    public ResponseEntity func7(@PathVariable("shelterId") Long shelterId){
        return null;
    }
}
