package donation.pet.dto.member;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class LoginRequestDto {

    private String clientId;
    private String clientSecret;
    private String email;
    private String password;
}
