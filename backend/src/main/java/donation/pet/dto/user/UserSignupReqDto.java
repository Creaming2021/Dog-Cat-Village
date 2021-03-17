package donation.pet.dto.user;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserSignupReqDto {
    private String email;
    private String password;
    private String nickname;
    private String phone;
}
