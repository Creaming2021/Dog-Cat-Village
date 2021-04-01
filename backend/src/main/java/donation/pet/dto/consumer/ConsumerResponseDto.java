package donation.pet.dto.consumer;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.Column;

@Data
public class ConsumerResponseDto {

    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String contractAddress;
    private String profileImage;
}
