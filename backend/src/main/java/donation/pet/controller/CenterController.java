package donation.pet.controller;

import donation.pet.dto.center.CenterPetsResponseDto;
import donation.pet.service.CenterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/centers")
public class CenterController {

    private final CenterService centerService;

    @GetMapping("/{centerId}/pets")
    public ResponseEntity getPetsInCenter(@PathVariable("centerId") Long centerId) {
        CenterPetsResponseDto result = centerService.getPets(centerId);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

//    @GetMapping("/{centerId}/adopts")
//    public ResponseEntity getAdopts(@PathVariable("centerId") Long centerId) {
//        centerService.getAdopts(centerId);
//    }

}
