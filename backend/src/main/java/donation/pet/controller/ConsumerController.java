package donation.pet.controller;

import donation.pet.dto.adopt.AdoptListResponseDto;
import donation.pet.dto.adopt.AdoptRequestDto;
import donation.pet.dto.adopt.AdoptResponseDto;
import donation.pet.dto.consumer.ConsumerResponseDto;
import donation.pet.dto.consumer.ConsumerUpdateRequestDto;
import donation.pet.service.ConsumerService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/consumers")
@Slf4j
public class ConsumerController {

    private final ConsumerService consumerService;

    @ApiOperation("해당 유저 정보 응답")
    @GetMapping("/{consumerId}")
    public ResponseEntity<ConsumerResponseDto> getConsumer(@PathVariable("consumerId") Long consumerId) {

        ConsumerResponseDto result = consumerService.getConsumer(consumerId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation("해당 유저 정보 수정")
    @PutMapping("/{consumerId}")
    public ResponseEntity<ConsumerResponseDto> updateConsumer(@PathVariable("consumerId") Long consumerId,
                                                              @RequestBody ConsumerUpdateRequestDto dto) {
        ConsumerResponseDto result = consumerService.updateConsumer(consumerId, dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation("해당 유저 프로필 이미지 등록")
    @PostMapping("/{consumerId}/image")
    public ResponseEntity<Void> saveProfileImage(@PathVariable("consumerId") Long consumerId,
                                                 @RequestParam MultipartFile file) throws IOException {
        consumerService.saveProfileImage(consumerId, file);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation("개인 유저가 작성한 입양 신청 리스트 요청")
    @GetMapping("/{consumerId}/adopts")
    public ResponseEntity<AdoptListResponseDto> getAdoptsByConsumer(@PathVariable("consumerId") Long consumerId){
        AdoptListResponseDto result = consumerService.getAdoptsByConsumer(consumerId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation("입양 신청 디테일 정보 요청")
    @GetMapping("/{consumerId}/adopts/{adoptId}")
    public ResponseEntity<AdoptResponseDto> getAdoptDetailByConsumer(@PathVariable("consumerId") Long consumerId, @PathVariable("adoptId") Long adoptId){
        AdoptResponseDto result = consumerService.getAdoptDetailByConsumer(consumerId, adoptId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation("입양 신청 등록 요청")
    @PostMapping("/{consumerId}/adopts")
    public ResponseEntity<Void> insertAdoptByConsumer(@PathVariable("consumerId") Long consumerId,
                                                      @RequestBody AdoptRequestDto dto){
        consumerService.insertAdoptByConsumer(consumerId, dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
