package donation.pet.dto.shelter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShelterUpdateRequestDto {
    private String introduce;
    private String phoneNumber;
    private String name;
    private String currentPassword;
    private String newPassword;
}
