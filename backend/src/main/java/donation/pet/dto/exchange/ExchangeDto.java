package donation.pet.dto.exchange;

import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.exchange.Exchange;
import donation.pet.domain.member.shelter.Shelter;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExchangeDto {

    private Long id;
    private String receiptImage;
    private int amount;
    private String description;
    private String transactionAddress;
    private AcceptStatus acceptStatus;
    private Shelter shelter;

    public static ExchangeDto createDto(Exchange exchange) {
        return ExchangeDto.builder()
            .id(exchange.getId())
            .receiptImage(exchange.getReceiptImage())
            .amount(exchange.getAmount())
            .description(exchange.getDescription())
            .transactionAddress(exchange.getTransactionAddress())
            .acceptStatus(exchange.getAcceptStatus())
            .shelter(exchange.getShelter()).build();
    }
}
