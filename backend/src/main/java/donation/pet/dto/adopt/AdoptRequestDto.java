package donation.pet.dto.adopt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdoptRequestDto {

    private Long userId;

    private Long centerId;

    private Long petId;
}
