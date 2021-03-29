package donation.pet.dto.adopt;

import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.pet.Pet;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AdoptDto {

    private Long id;

    private AcceptStatus acceptStatus;

    private LocalDateTime statusDate;

//    private User user;

//    private Center center;

    private Pet pet;
}
