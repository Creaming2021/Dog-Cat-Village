package donation.pet.domain.adopt;

import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.etc.BaseTimeEntity;
import donation.pet.domain.member.Member;
import donation.pet.domain.pet.Pet;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@Entity
@Getter
public class Adopt extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adopt_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private AcceptStatus acceptStatus;

    // 수정 예정 => 필요없을 수도
    private LocalDateTime statusDate;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Pet pet;

    // 입양 신청 form 추가 예정
}
