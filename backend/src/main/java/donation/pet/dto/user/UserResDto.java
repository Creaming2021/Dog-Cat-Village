package donation.pet.dto.user;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserResDto {
    private String email;
    private String nickname;
    private String phone;
}
