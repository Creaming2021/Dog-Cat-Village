package donation.pet.dto.member;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class LoginRequestDto {

    private String username;
    private String password;
    private String grant_type;
}
