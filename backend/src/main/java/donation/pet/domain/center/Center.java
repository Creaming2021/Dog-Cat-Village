package donation.pet.domain.center;

import com.sun.istack.NotNull;
import donation.pet.domain.adopt.Adopt;
import donation.pet.domain.etc.BaseTimeEntity;
import donation.pet.domain.exchange.Exchange;
import donation.pet.domain.pet.Pet;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Builder
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id", callSuper = false)
public class Center extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "center_id")
    private Long id;

    @NotNull
    @Column(unique = true)
    private String name;

    private String email;
    private String password;
    private String accept;
    private String phoneNumber;
    private String contractAddress;
    private String profileImage;
    private String address;

    @Lob
    @Column(name = "center_introduce")
    private String introduce;

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Adopt> adopts = new ArrayList<>();

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Pet> pets = new ArrayList<>();

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Exchange> exchanges = new ArrayList<>();

    // center 관련 정보 추가 예정
}
