package donation.pet.dto.blockchain;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlockchainTransactionListDto {

     List<BlockchainTransactionDto> transactionList;
}
