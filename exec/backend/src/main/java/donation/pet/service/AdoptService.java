package donation.pet.service;

import donation.pet.domain.adopt.AdoptRepository;
import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.pet.PetRepository;
import donation.pet.dto.adopt.AdoptMonthlyCountDto;
import donation.pet.dto.adopt.AdoptTodayDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;

@Service
@RequiredArgsConstructor
@Transactional
public class AdoptService {

    private final AdoptRepository adoptRepository;
    private final PetRepository petRepository;
    private final ModelMapper modelMapper;

    public AdoptTodayDto getTodayAdoption() {
        int count = (int) adoptRepository.findAll().stream()
                .filter(adopt -> adopt.getAcceptStatus() == AcceptStatus.ACCEPTED)
                .filter(adopt -> adopt.getStatusDate().equals(LocalDate.now()))
                .count();

//        int count = (int) adoptRepository.countByAcceptStatusAndStatusDate(AcceptStatus.ACCEPTED, LocalDate.now());
        return new AdoptTodayDto(count);
    }

    public AdoptMonthlyCountDto getMonthlyPerCount(int year) {
        int[] monthlyAdoption = new int[12];
        adoptRepository.findAll().forEach(adopt -> {
            Month month = adopt.getMonthByGivenYearAdopted(year);
            if (month != null) {
                monthlyAdoption[month.getValue() - 1]++;
            }
        });
        return new AdoptMonthlyCountDto(year, monthlyAdoption);
    }

}
