package donation.pet.dto.shelter;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ShelterResDto {
    private String email;
    private String name;
    private String phone;
}
