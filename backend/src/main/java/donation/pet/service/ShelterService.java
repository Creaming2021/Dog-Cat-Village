package donation.pet.service;

import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.shelter.ShelterRepository;
import donation.pet.dto.shelter.ShelterResponseDto;
import donation.pet.exception.BaseException;
import donation.pet.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ShelterService {

    private final ShelterRepository shelterRepository;
    private final ModelMapper modelMapper;

    public void getAllShelters() {


    }

    public ShelterResponseDto getShelter(Long shelterId) {
        Shelter shelter = shelterRepository.findById(shelterId)
                .orElseThrow(() -> new BaseException(ErrorCode.SHELTER_NOT_EXIST));
        ShelterResponseDto dto = modelMapper.map(shelter, ShelterResponseDto.class);
        return null;
    }
}
