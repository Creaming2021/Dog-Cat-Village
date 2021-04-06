package donation.pet.service;

import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.domain.pet.AdoptStatus;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.pet.PetRepository;
import donation.pet.dto.pet.*;
import donation.pet.exception.BaseException;
import donation.pet.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import static donation.pet.service.S3Service.CLOUD_FRONT_DOMAIN_NAME;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class PetService {

    private final PetRepository petRepository;
    private final ShelterRepository shelterRepository;
    private final ModelMapper modelMapper;
    private final S3Service s3Service;

    public List<PetSimpleDto> getPetAll() {
        return petRepository.findSimplePets().stream()
                .map(Pet::changeToDto)
                .map(pet -> modelMapper.map(pet, PetSimpleDto.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public Long insertPet(PetRequestDto dto) {
        Shelter shelter = shelterRepository.findById(dto.getShelterId())
                .orElseThrow(() -> new BaseException(ErrorCode.SHELTER_NOT_EXIST));
        Pet pet = Pet.createPet(dto, shelter);
        petRepository.save(pet);
        return pet.getId();
    }

    public PetDto getPetById(Long petId) {
        return petRepository.findById(petId)
                .orElseThrow(() -> new BaseException(ErrorCode.PET_NOT_EXIST))
                .changeToDto();
    }

    @Transactional
    public PetDto updatePetById(Long petId, PetRequestDto dto) {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new BaseException(ErrorCode.PET_NOT_EXIST));
        pet.changeForm(dto);
        return pet.changeToDto();
    }

    @Transactional
    public void deletePetById(Long petId) {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new BaseException(ErrorCode.PET_NOT_EXIST));
        pet.changeStatus(AdoptStatus.DELETE);
        pet.getAdopts().forEach(adopt -> adopt.setAcceptStatus(AcceptStatus.REFUSED));
    }

    @Transactional
    public void saveProfileImage(Long petId, MultipartFile file) throws IOException {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new BaseException(ErrorCode.PET_NOT_EXIST));
        // 파일 처리
        pet.updateProfileImage("https://" + CLOUD_FRONT_DOMAIN_NAME + "/" + s3Service.uploadFile(file));
        petRepository.save(pet);
    }
}
