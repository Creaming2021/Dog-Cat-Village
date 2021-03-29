package donation.pet.dto.pet;

import donation.pet.domain.pet.AdoptStatus;
import donation.pet.domain.pet.BreedType;
import donation.pet.domain.pet.Neuter;
import donation.pet.domain.pet.Sex;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PetPostRequestDto {

    private Long centerId;

    private Long id;
    private String name;
    private String breed;
    private String imageUrl;
    private LocalDateTime birthday;
    private Integer age;
    private Float weight;
    private BreedType breedType;
    private String personality;
    private String condition;
    private Sex sex;
    private Neuter neuter;

}
