package donation.pet.dto.consumer;

import donation.pet.domain.member.consumer.Consumer;
import lombok.Data;

@Data
public class ConsumerUpdateRequestDto {

    private String name;
    private String password;
    private String phoneNumber;

}
