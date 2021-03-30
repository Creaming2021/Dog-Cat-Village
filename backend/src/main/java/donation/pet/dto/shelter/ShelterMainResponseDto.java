package donation.pet.dto.shelter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShelterMainResponseDto {
    private Long id;
    private String name;
    private String siteUrl;
    private String introduce;
    private String phoneNumber;
}
