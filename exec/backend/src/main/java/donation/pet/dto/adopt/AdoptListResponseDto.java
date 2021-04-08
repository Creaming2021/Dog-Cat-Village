package donation.pet.dto.adopt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdoptListResponseDto {

    private List<AdoptSimpleDto> adopts;
}
