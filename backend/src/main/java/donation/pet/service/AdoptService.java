package donation.pet.service;

import donation.pet.domain.adopt.Adopt;
import donation.pet.domain.adopt.AdoptRepository;
import donation.pet.domain.center.Center;
import donation.pet.domain.center.CenterRepository;
import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.pet.PetRepository;
import donation.pet.domain.user.User;
import donation.pet.domain.user.UserRepository;
import donation.pet.dto.adopt.AdoptDto;
import donation.pet.dto.adopt.AdoptRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AdoptService {

    private final AdoptRepository adoptRepository;
    private final PetRepository petRepository;
    private final UserRepository userRepository;
    private final CenterRepository centerRepository;
    private final ModelMapper modelMapper;


    public void requestAdopt(AdoptRequestDto dto) {
        Center center = centerRepository.findById(dto.getCenterId()).orElseThrow();
        Pet pet = petRepository.findById(dto.getPetId()).orElseThrow();
        User user = userRepository.findById(dto.getUserId()).orElseThrow();
        Adopt adopt = Adopt.createAdopt(user, pet, center);
        adoptRepository.save(adopt);
    }
}
