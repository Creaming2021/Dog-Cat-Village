package donation.pet.dto.pet;

import donation.pet.domain.etc.Sex;
import donation.pet.domain.pet.BreedType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PetSimpleDto {

    private Long id;
    private String name;
    private String profileImage;
    private String birthday;
    private String age;
    private Sex sex;
    private BreedType breedType;
    private Long shelterId;
    private String shelterName;
    
}
