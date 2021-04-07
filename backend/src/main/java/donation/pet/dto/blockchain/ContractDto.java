package donation.pet.dto.blockchain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ContractDto {
    private int blockNumber;
    private long timeStamp;
    private String hash;
    private int nonce;
    private String blockHash;
    private String from;
    private String contractAddress;
    private String to;
    private long value;
    private String tokenName;
    private String tokenSymbol;
    private int tokenDecimal;
    private int transactionIndex;
    private int gas;
    private long gasPrice;
    private int gasUsed;
    private int cumulativeGasUsed;
    private String input;
    private int confirmations;
}
