//package donation.pet.service;
//
//import donation.pet.domain.adopt.Adopt;
//import donation.pet.domain.adopt.AdoptRepository;
//import donation.pet.domain.center.Center;
//import donation.pet.domain.center.CenterRepository;
//import donation.pet.domain.pet.Pet;
//import donation.pet.domain.pet.PetRepository;
//import donation.pet.dto.adopt.AdoptDto;
//import donation.pet.dto.center.CenterPetsResponseDto;
//import donation.pet.dto.pet.PetDto;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//@Transactional
//@RequiredArgsConstructor
//public class CenterService {
//
//    private final CenterRepository centerRepository;
//    private final PetRepository petRepository;
//    private final AdoptRepository adoptRepository;
//
//    public CenterPetsResponseDto getPets(Long centerId) {
//        Center center = centerRepository.findById(centerId).orElseThrow();
//        List<PetDto> petDtos = petRepository.findAllByCenterId(centerId).stream()
//                .map(Pet::changeToDto).collect(Collectors.toList());
//
//        return CenterPetsResponseDto.builder()
//                .centerName(center.getName())
//                .pets(petDtos).build();
//    }
//
//}
