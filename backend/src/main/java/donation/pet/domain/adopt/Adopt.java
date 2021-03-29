package donation.pet.domain.adopt;

import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.etc.BaseTimeEntity;
import donation.pet.domain.member.shelter.Shelter;
import donation.pet.domain.member.consumer.Consumer;
import donation.pet.domain.pet.AdoptStatus;
import donation.pet.domain.pet.Pet;
import donation.pet.domain.etc.Sex;
import donation.pet.dto.adopt.AdoptDto;
import lombok.*;
import org.modelmapper.ModelMapper;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Month;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter // 테스트 코드 용도....
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
    private LocalDate statusDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consumer_id")
    private Consumer consumer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shelter_id")
    private Shelter shelter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id")
    private Pet pet;

    // 입양 신청 form
    private String name;
    private Sex sex;
    private String age;
    private String address;
    @Lob
    private String description;
    private String day;
    private String time;

    //////////////////////////////////////////

    // 승인 상태 변경 ( 승인 상태 변경시 statusDate 수정)
    public void changeAccept(AcceptStatus acceptStatus) {
        if (this.acceptStatus == acceptStatus) {
            return;
        }
        this.acceptStatus = acceptStatus;
        statusDate = LocalDate.now();
        if (acceptStatus == AcceptStatus.ACCEPTED) {
            pet.changeStatus(AdoptStatus.ADOPTED);
        }
    }

    // 입양신청서 작성 ( 생성 메소드 )
    public static Adopt createAdopt(Consumer consumer, Shelter shelter, Pet pet) {
        Adopt adopt = new Adopt();
        if (consumer != null) {
            adopt.consumer = consumer;
            consumer.getAdopts().add(adopt);
        }
        if (pet != null) {
            adopt.pet = pet;
            pet.getAdopts().add(adopt);
        }
        if (shelter != null) {
            adopt.shelter = shelter;
            shelter.getAdopts().add(adopt);
        }
        adopt.acceptStatus = AcceptStatus.PENDING;
        return adopt;
    }

    // 입양 승인 & 연도 체크용
    public Month getMonthByGivenYearAdopted(int year) {
        if (acceptStatus == AcceptStatus.ACCEPTED && statusDate.getYear() == year) {
            return getStatusDate().getMonth();
        }
        return null;
    }

    public AdoptDto toDto() {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(this, AdoptDto.class);
    }

}
