package donation.pet.dto.consumer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ConsumerSignupRequestDto {

    private String email;
    private String password;
    private String name;
    private String phoneNumber;
}
