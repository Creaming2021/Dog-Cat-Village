package donation.pet.dto.shelter;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ShelterSignupReqDto {
    private String email;
    private String password;
    private String name;
    private String phone;
}
