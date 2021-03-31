package donation.pet.dto.shelter;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ShelterListResponseDto {

    List<ShelterResponseDto> shelterList;
}
