package donation.pet.controller;

import donation.pet.dto.adopt.AdoptRequestDto;
import donation.pet.dto.adopt.AdoptTodayDto;
import donation.pet.service.AdoptService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/adopts")
public class AdoptController {

    private final AdoptService adoptService;

    @PostMapping
    public ResponseEntity<Void> requestAdopt(@RequestBody AdoptRequestDto dto) {
//        adoptService.requestAdopt(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation("오늘 입양된 동물 수")
    @GetMapping("/today/count")
    public ResponseEntity<AdoptTodayDto> getTodayAdoption() {
        AdoptTodayDto result = adoptService.getTodayAdoption();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
