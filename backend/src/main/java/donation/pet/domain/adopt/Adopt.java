package donation.pet.domain.adopt;

import donation.pet.domain.center.Center;
import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.etc.BaseTimeEntity;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.user.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Builder
@EqualsAndHashCode(of = "id", callSuper = false)
public class Adopt extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adopt_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private AcceptStatus acceptStatus;

    // 수정 예정 => 필요없을 수도
    private LocalDateTime statusDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id")
    private Center center;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id")
    private Pet pet;

    // 입양 신청 form 추가 예정

    //////////////////////////////////////////

    // 승인 상태 변경
    public void changeAccept(AcceptStatus acceptStatus) {
        this.acceptStatus = acceptStatus;
    }

    // 유저의 입양신청서 작성 ( 생성 메소드 )
    public static Adopt createAdoptForUser(User user, Pet pet) {
        Adopt adopt = new Adopt();
        adopt.user = user;
        adopt.pet = pet;
        adopt.acceptStatus = AcceptStatus.PENDING;
        user.getAdopts().add(adopt);
        pet.getAdopts().add(adopt);

        return adopt;
    }


}
