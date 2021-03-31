package donation.pet.dto.adopt;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdoptMonthlyCountDto {

    private int year;

    private int[] monthlyAdoption;
}
