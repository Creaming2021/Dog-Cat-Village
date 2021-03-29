package donation.pet.dto.pet;

import donation.pet.domain.pet.AdoptStatus;
import donation.pet.domain.pet.BreedType;
import donation.pet.domain.pet.Neuter;
import donation.pet.domain.pet.Sex;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PetResponseDto {

    private String centerName;
    private Long centerId;

    private Long id;
    private String name;
    private String breed;
    private String imageUrl;
    private LocalDateTime birthday;
    private String age;
    private Float weight;
    private BreedType breedType;
    private String personality;
    private String condition;
    private Sex sex;
    private Neuter neuter;
    private AdoptStatus adoptStatus;
}
