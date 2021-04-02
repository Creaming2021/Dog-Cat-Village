package donation.pet.domain.member;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter(AccessLevel.PROTECTED)
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "ROLE")
@EqualsAndHashCode(of = "id", callSuper = false)
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @NotNull
    @Column(unique = true)
    private String name;

    @Column(unique = true)
    private String email;

    private String password;
    private String phoneNumber;
    private String accept;

    private String contractAddress;
    private String profileImage;

    private String tempLink;
    private LocalDateTime tempLinkDate;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private Set<MemberRole> roles;

    private String privateKey;

    public void updateAccept(String accept) { this.accept = accept; }

    public void updatePassword(String encodePassword) {
        this.password = encodePassword;
    }

    // 패스워드 변경 링크
    public void updateTempLink(String tempLink) {
        this.tempLink = tempLink;
        this.tempLinkDate = LocalDateTime.now();
    }

    // 계정 주소 및 비밀키 저장
    public void createContractAddress(String contractAddress, String privateKey) {
        this.contractAddress = contractAddress;
        this.privateKey = privateKey;
    }
}
