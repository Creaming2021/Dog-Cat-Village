package donation.pet.dto.adopt;

import donation.pet.domain.etc.Sex;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdoptRequestDto {

    private Long petId;
    private String name;
    private Sex sex;
    private String address;
    private String description;
    private String day;
    private String time;

}