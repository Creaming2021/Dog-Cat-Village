package donation.pet.dto.shelter;

import lombok.Data;

import java.util.List;

@Data
public class ShelterListResponseDto {

    List<ShelterResponseDto> shelterList;
}
