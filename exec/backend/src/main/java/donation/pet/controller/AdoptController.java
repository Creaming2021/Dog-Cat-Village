package donation.pet.controller;

import donation.pet.dto.adopt.AdoptMonthlyCountDto;
import donation.pet.dto.adopt.AdoptTodayDto;
import donation.pet.service.AdoptService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RequestMapping("/adopts")
public class AdoptController {

    private final AdoptService adoptService;

    @ApiOperation("오늘 입양된 동물 수")
    @GetMapping("/today/count")
    public ResponseEntity<AdoptTodayDto> getTodayAdoption() {
        AdoptTodayDto result = adoptService.getTodayAdoption();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation("연도별 월별 입양된 동물 수")
    @GetMapping("/years/{year}/count")
    public ResponseEntity<AdoptMonthlyCountDto> getMonthlyPetCount(@PathVariable("year") int year){
        AdoptMonthlyCountDto result = adoptService.getMonthlyPerCount(year);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
