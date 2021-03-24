package donation.pet.domain.exchange;

import donation.pet.domain.center.Center;
import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.etc.BaseTimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Exchange extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exchange_id")
    private Long id;

    private String receiptImage;

    private String transactionAddress;

    @Enumerated(EnumType.STRING)
    private AcceptStatus acceptStatus;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Center center;
}
