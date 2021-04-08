package donation.pet.dto.blockchain;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BlockchainRequestDto {

    private Long id;
    private String contractAddress;
    private String privateKey;
}
