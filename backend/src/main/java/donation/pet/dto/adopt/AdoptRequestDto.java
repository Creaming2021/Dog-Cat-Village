package donation.pet.dto.adopt;

import donation.pet.domain.center.Center;
import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdoptRequestDto {

    private Long userId;

    private Long centerId;

    private Long petId;
}
