package donation.pet.dto.adopt;

import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.etc.Sex;
import donation.pet.domain.pet.Pet;
import donation.pet.dto.consumer.ConsumerResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdoptDto {

    private Long id;
    private Long petId;
    private Long consumerId;
    private Long shelterId;

    private String name;
    private Sex sex;
    private String age;
    private String address;
    private String description;
    private String day;
    private String time;
    private AcceptStatus acceptStatus;
    private LocalDateTime createdDate;

}
