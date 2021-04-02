package donation.pet.dto.blockchain;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BlockchainRequestDto {

    private String address;
    private String privateKey;
}
