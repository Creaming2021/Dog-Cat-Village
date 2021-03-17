package donation.pet.dto;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class LoginReqDto {
    private String email;
    private String password;
}
