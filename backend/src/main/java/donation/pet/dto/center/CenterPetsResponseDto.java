package donation.pet.dto.center;

import donation.pet.dto.pet.PetDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class CenterPetsResponseDto {

    String centerName;

    List<PetDto> pets;

}
