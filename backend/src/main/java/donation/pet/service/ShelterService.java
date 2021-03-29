package donation.pet.service;

import donation.pet.domain.adopt.Adopt;
import donation.pet.domain.adopt.AdoptRepository;
import donation.pet.domain.member.consumer.ConsumerRepository;
import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.pet.PetRepository;
import donation.pet.dto.adopt.*;
import donation.pet.dto.pet.PetDto;
import donation.pet.dto.pet.PetResponseListDto;
import donation.pet.dto.pet.PetSimpleDto;
import donation.pet.dto.shelter.ShelterListResponseDto;
import donation.pet.dto.shelter.ShelterResponseDto;
import donation.pet.dto.shelter.ShelterUpdateRequestDto;
import donation.pet.exception.BaseException;
import donation.pet.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ShelterService {

    private final ShelterRepository shelterRepository;
    private final AdoptRepository adoptRepository;
    private final ConsumerRepository consumerRepository;
    private final PetRepository petRepository;
    private final ModelMapper modelMapper;

    public ShelterListResponseDto getAllShelters() {
        List<ShelterResponseDto> shelterResponseDtos = shelterRepository.findAll().stream()
                .map(shelter -> modelMapper.map(shelter, ShelterResponseDto.class))
                .collect(Collectors.toList());
        return new ShelterListResponseDto(shelterResponseDtos);
    }

    public ShelterResponseDto getShelter(Long shelterId) {
        Shelter shelter = shelterRepository.findById(shelterId)
                .orElseThrow(() -> new BaseException(ErrorCode.SHELTER_NOT_EXIST));
        int[] monthlyAdoption = shelter.getMonthlyAdoptionFromYear(LocalDate.now().getYear());
        ShelterResponseDto dto = modelMapper.map(shelter, ShelterResponseDto.class);
        dto.setMonthlyAdoption(monthlyAdoption);
        return dto;
    }

    @Transactional
    public ShelterResponseDto updateShelter(Long shelterId, ShelterUpdateRequestDto dto) {
        Shelter shelter = shelterRepository.findById(shelterId)
                .orElseThrow(() -> new BaseException(ErrorCode.SHELTER_NOT_EXIST));
        if (checkShelterName(dto.getName())) {
            throw new BaseException(ErrorCode.NAME_DUPLICATION);
        }
        shelter.updateShelter(dto);
        return modelMapper.map(shelter, ShelterResponseDto.class);
    }

    public boolean checkShelterName(String name) {
        return shelterRepository.existsByName(name);
    }

    @Transactional
    public ShelterResponseDto insertShelterImage(Long shelterId, MultipartFile file) {
        Shelter shelter = shelterRepository.findById(shelterId)
                .orElseThrow(() -> new BaseException(ErrorCode.SHELTER_NOT_EXIST));
        // s3 를 이용한 파일 업로드 및 파일이름 구현 예정
        shelter.updateProfileImage("");
        return modelMapper.map(shelter, ShelterResponseDto.class);
    }

    // 특정 보호소에 들어온 입양 신청 리스트 요청
    public AdoptListResponseDto getAdoptsByShelter(Long shelterId) {

        List<Adopt> adopts = adoptRepository.findByShelter(shelterId);
        List<AdoptSimpleDto> result = adopts.stream()
                .map(adopt -> modelMapper.map(adopt, AdoptSimpleDto.class))
                .collect(Collectors.toList());
        return new AdoptListResponseDto(result);

    }

    // 입양 신청 디테일 정보 요청
    public AdoptResponseDto getAdopt(Long shelterId, Long adoptId) {
        Adopt adopt = adoptRepository.findById(adoptId)
                .orElseThrow(() -> new BaseException(ErrorCode.ADOPT_NOT_EXIST));
        if (!adopt.getShelter().getId().equals(shelterId)) {
            throw new BaseException(ErrorCode.SHELTER_NOT_MATCH);
        }
        return adopt.toAdoptDto();
    }

    // 입양 신청 상태 변경 요청
    @Transactional
    public AdoptResponseDto updateAdopt(Long shelterId, Long adoptId, AdoptStatusDto dto) {
        Adopt adopt = adoptRepository.findById(adoptId).orElseThrow(() -> new BaseException(ErrorCode.ADOPT_NOT_EXIST));
        adopt.changeAccept(dto.getStatus());
        adoptRepository.save(adopt);
        return adopt.toAdoptDto();
    }


    // 특정 보호소 동물 리스트
    public PetResponseListDto getPetsByShelterId(Long shelterId){
        Shelter shelter = shelterRepository.findById(shelterId)
                .orElseThrow(() -> new BaseException(ErrorCode.SHELTER_NOT_EXIST));
        List<PetSimpleDto> petResponseDtos = shelter.getPets().stream()
                .map(pet -> modelMapper.map(pet, PetSimpleDto.class))
                .collect(Collectors.toList());
        return new PetResponseListDto(petResponseDtos);
    }

}
