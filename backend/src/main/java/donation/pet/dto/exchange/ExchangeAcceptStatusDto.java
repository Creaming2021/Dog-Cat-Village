package donation.pet.dto.exchange;

import donation.pet.domain.etc.AcceptStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExchangeAcceptStatusDto {

    private AcceptStatus acceptStatus;
    private String transactionAddress; // 성공일 때만 사용
}
