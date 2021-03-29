package donation.pet.service;

import donation.pet.domain.adopt.Adopt;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.pet.PetRepository;
import donation.pet.dto.pet.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class PetService {

    private final PetRepository petRepository;
//    private final CenterRepository centerRepository;
    private final ModelMapper modelMapper;

    public PetResponseListDto getPetAll() {

        List<PetResponseDto> petResponseDtos = petRepository.findAll().stream()
                .map(Pet::changeToDto)
                .map(petDto -> modelMapper.map(petDto, PetResponseDto.class))
                .collect(Collectors.toList());

        return new PetResponseListDto(petResponseDtos);
    }

    @Transactional
    public PetResponseDto insertPet(PetPostRequestDto dto) {
//        Center center = centerRepository.findById(dto.getCenterId()).orElseThrow();
//        PetDto petDto = modelMapper.map(dto, PetDto.class);
//        Pet pet = Pet.createPet2(petDto, center);
//        petRepository.save(pet);
//
//        return modelMapper.map(pet.changeToDto(), PetResponseDto.class);
        return null;
    }

    public PetResponseDto getPetById(Long petId) {
        PetDto petDto = petRepository.findById(petId).orElseThrow().changeToDto();
        return modelMapper.map(petDto, PetResponseDto.class);
    }

    /*
    1. PetUpdateRequestDto 를 받아옴
    2. => petDto 로 변경 ( center 직접 넣어주기 )
    3. => pet 으로 변경
     */
    @Transactional
    public PetDto updatePetById(Long petId, PetUpdateRequestDto dto) {
//        Center center = centerRepository.findById(dto.getCenterId()).orElseThrow();
//        PetDto petDto = modelMapper.map(dto, PetDto.class);
//        petDto.setCenter(center);
//        Pet pet = modelMapper.map(petDto, Pet.class);
//        petRepository.save(pet);
//        return petDto;
        return null;
    }

    @Transactional
    public void deletePetById(Long petId) {
//        Pet pet = petRepository.findById(petId).orElseThrow();
//        pet.getAdopts().forEach(Adopt::removeAdopt);
//        petRepository.delete(pet);
    }
}
