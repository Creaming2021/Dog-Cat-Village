package donation.pet.dto.adopt;

import donation.pet.domain.center.Center;
import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Builder
public class AdoptDto {

    private Long id;

    private AcceptStatus acceptStatus;

    private LocalDateTime statusDate;

    private User user;

    private Center center;

    private Pet pet;
}
