package donation.pet.domain.shelter;

import lombok.*;

import javax.persistence.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class Shelter {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shelter_id")
    private Long id;

    @Column(name = "shelter_email")
    private String email;

    @Column(name = "shelter_password")
    private String password;

    @Column(name = "shelter_name")
    private String name;

    @Column(name = "shelter_phone")
    private String phone;

    @Column(name = "shelter_email_accept")
    private String accept;

}
