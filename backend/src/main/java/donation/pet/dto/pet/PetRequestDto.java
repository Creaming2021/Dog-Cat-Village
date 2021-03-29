package donation.pet.dto.pet;

import donation.pet.domain.pet.BreedType;
import donation.pet.domain.pet.Neuter;
import donation.pet.domain.etc.Sex;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PetRequestDto {

    private Long shelterId;
    private Long petId;

    private String name;
    private String profileImage;
    private Sex sex;
    private Float weight;
    private BreedType breedType;
    private String breed;
    private LocalDateTime birthday;
    private String personality;
    private Neuter neuter;
    private String condition;
}
