package donation.pet.dto.adopt;

import donation.pet.domain.etc.AcceptStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdoptSimpleDto {

    private Long id;
    private String petName;
    private LocalDateTime createdDate;
    private AcceptStatus acceptStatus;
}
