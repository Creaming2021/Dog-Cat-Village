package donation.pet.dto.pet;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PetResponseListDto {

     private List<PetResponseDto> pets;

}
