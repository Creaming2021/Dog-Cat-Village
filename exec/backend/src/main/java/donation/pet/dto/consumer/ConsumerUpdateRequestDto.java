package donation.pet.dto.consumer;

import donation.pet.domain.member.consumer.Consumer;
import lombok.Data;

@Data
public class ConsumerUpdateRequestDto {

    private String name;
    private String currentPassword;
    private String newPassword;
    private String phoneNumber;

}
