package donation.pet.domain.user;

import lombok.*;

import javax.persistence.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "user_email")
    private String email;

    @Column(name = "user_password")
    private String password;

    @Column(name = "user_nickname")
    private String nickname;

    @Column(name = "user_phone")
    private String phone;

    @Column(name = "user_email_accept")
    private String accept;

}
