package donation.pet.domain.member;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "ROLE")
@EqualsAndHashCode(of = "id", callSuper = false)
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    protected Long id;

    @NotNull
    @Column(unique = true)
    protected String name;

    @Column(unique = true)
    protected String email;

    protected String password;
    protected String phoneNumber;
    protected String accept;

    protected String contractAddress;
    protected String profileImage;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    protected Set<MemberRole> roles;

    public void signup(String encodePassword, String role) {
        this.updatePassword(encodePassword);
        if (role.equals("admin")) {
            roles = Set.of(MemberRole.ADMIN, MemberRole.USER, MemberRole.SHELTER);
        } else if (role.equals("user")){
            roles = Set.of(MemberRole.USER);
        } else {
            roles = Set.of(MemberRole.SHELTER);
        }
    }

    public void updateAccept(String accept) { this.accept = accept; }

    public void updatePassword(String encodePassword) {
        this.password = encodePassword;
    }

}
