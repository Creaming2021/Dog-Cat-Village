package donation.pet.domain.exchange;

import donation.pet.domain.center.Center;
import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.etc.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Builder
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id", callSuper = false)
public class Exchange extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exchange_id")
    private Long id;

    private String receiptImage;
    private String transactionAddress;

    @Enumerated(EnumType.STRING)
    private AcceptStatus acceptStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id")
    private Center center;

    /////////////////////////////////////

    public static Exchange createExchage(Center center, String receiptImage, String transactionAddress) {
        Exchange exchange = new Exchange();
        exchange.center = center;
        exchange.receiptImage = receiptImage;
        exchange.transactionAddress = transactionAddress;
        exchange.acceptStatus = AcceptStatus.PENDING;
        center.getExchanges().add(exchange);

        return exchange;
    }

    public void changeAcceptStatus(AcceptStatus acceptStatus) {
        this.acceptStatus = acceptStatus;
    }
}
