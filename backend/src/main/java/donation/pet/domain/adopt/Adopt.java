package donation.pet.domain.adopt;

import donation.pet.domain.center.Center;
import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.etc.BaseTimeEntity;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.user.User;
import donation.pet.dto.adopt.AdoptDto;
import lombok.*;
import org.modelmapper.ModelMapper;

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
        if (acceptStatus == AcceptStatus.PENDING) {
            return;
        }
        statusDate = LocalDateTime.now();
    }

    // 유저의 입양신청서 작성 ( 생성 메소드 )
    public static Adopt createAdopt(User user, Pet pet, Center center) {
        Adopt adopt = new Adopt();
        adopt.user = user;
        adopt.pet = pet;
        adopt.center = center;
        adopt.acceptStatus = AcceptStatus.PENDING;
        user.getAdopts().add(adopt);
        pet.getAdopts().add(adopt);
        center.getAdopts().add(adopt);

        return adopt;
    }

    public void removeAdopt() {
        this.user.getAdopts().remove(this);
        this.user = null;
        this.center.getAdopts().remove(this);
        this.center = null;
        this.pet.getAdopts().remove(this);
        this.pet = null;
    }

    public AdoptDto changeToDto() {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(this, AdoptDto.class);
    }
}
