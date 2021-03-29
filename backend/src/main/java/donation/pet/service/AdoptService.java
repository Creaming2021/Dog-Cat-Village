package donation.pet.service;

import donation.pet.domain.adopt.AdoptRepository;
import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.pet.PetRepository;
import donation.pet.dto.adopt.AdoptTodayDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class AdoptService {

    private final AdoptRepository adoptRepository;
    private final PetRepository petRepository;
    private final ModelMapper modelMapper;

    public AdoptTodayDto getTodayAdoption() {
        int count = (int) adoptRepository.countByAcceptStatusAndStatusDate(AcceptStatus.ACCEPTED, LocalDate.now());
        return new AdoptTodayDto(count);
    }


//    public void requestAdopt(AdoptRequestDto dto) {
//        Center center = centerRepository.findById(dto.getCenterId()).orElseThrow();
//        Pet pet = petRepository.findById(dto.getPetId()).orElseThrow();
//        User user = userRepository.findById(dto.getUserId()).orElseThrow();
//        Adopt adopt = Adopt.createAdopt(user, pet, center);
//        adoptRepository.save(adopt);
//    }
}
