package donation.pet.controller;

import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.service.ShelterService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/shelters")
public class ShelterController {

    private final ShelterService shelterService;

    @ApiOperation("보호소 리스트")
    @GetMapping
    public ResponseEntity<> getAllShelters(){
        shelterService.getAllShelters();
    }

    @ApiOperation("보호소 유저 정보")
    @GetMapping("/{shelterId}")
    public ResponseEntity<> func(@PathVariable("shelterId") Long shelterId){
        shelterService.getShelter(shelterId);
    }

    @ApiOperation("보호소 유저 정보 수정")
    @PutMapping("/{shelterId}")
    public ResponseEntity<> func(@PathVariable("shelterId") Long shelterId){

    }

    @ApiOperation("특정 보호소에 들어온 입양 신청 리스트 요청")
    @GetMapping("/{shelterId}/adopts")
    public ResponseEntity<> func(@PathVariable("shelterId") Long shelterId){

    }

    @ApiOperation("입양 신청 디테일 정보 요청")
    @GetMapping("/{shelterId}/adopts/{adoptId}")
    public ResponseEntity<> func(@PathVariable("shelterId") Long shelterId, @PathVariable("adoptId") Long adoptId){

    }

    @ApiOperation("입양 신청 상태 변경 요청")
    @PutMapping("/{shelterId}/adopts/{adoptId}")
    public ResponseEntity<> func(@PathVariable("shelterId") Long shelterId, @PathVariable("adoptId") Long adoptId){

    }

    @ApiOperation("특정 보호소 동물 리스트")
    @GetMapping("/{shelterId}/pets")
    public ResponseEntity<> func(@PathVariable("shelterId") Long shelterId){

    }
}
