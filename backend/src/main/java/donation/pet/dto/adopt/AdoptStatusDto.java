package donation.pet.dto.adopt;

import donation.pet.domain.etc.AcceptStatus;
import lombok.Data;

@Data
public class AdoptStatusDto {
    private AcceptStatus status;
}