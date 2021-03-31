package donation.pet.dto.blockchain;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BlockchainIdToAddressDto {

    private String shelterAddress;
    private String consumerAddress;
    private String consumerPrivateKey;
}
