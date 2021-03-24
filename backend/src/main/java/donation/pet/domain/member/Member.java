package donation.pet.domain.member;

import com.sun.istack.NotNull;
import donation.pet.domain.adopt.Adopt;
import donation.pet.domain.etc.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @NotNull
    @Column(unique = true)
    private String name;

    private String email;

    private String password;

    private String phoneNumber;

    private String accept;

    private String contractAddress;

    private String profileImage;

    @OneToMany
    @JoinColumn(name = "member")
    private final List<Adopt> adopts = new ArrayList<>();


}
