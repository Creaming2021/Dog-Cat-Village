package donation.pet.controller;

import donation.pet.dto.adopt.AdoptRequestDto;
import donation.pet.service.AdoptService;
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
    public ResponseEntity requestAdopt(@RequestBody AdoptRequestDto dto) {
        adoptService.requestAdopt(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


}
