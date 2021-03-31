package donation.pet.dto.blockchain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BlockchainTransactionDto {

    private Long fromId;
    private String fromName;
    private String fromProfileImage;

    private Long toId;
    private String toName;
    private String toProfileImage;

    private String contractAddress;
    private LocalDateTime time;
    private Long value;
}
