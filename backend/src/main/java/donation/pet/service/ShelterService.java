package donation.pet.service;

import donation.pet.domain.member.shelter.ShelterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ShelterService {

    private final ShelterRepository shelterRepository;

    public void getAllShelters() {


    }
}
