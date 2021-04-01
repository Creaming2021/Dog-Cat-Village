package donation.pet.dto.consumer;

import donation.pet.domain.member.MemberRole;
import donation.pet.domain.member.consumer.Consumer;
import donation.pet.domain.member.shelter.Shelter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MemberSignupRequestDto {

    private MemberRole memberRole;
    private String email;
    private String password;
    private String name;
    private String phoneNumber;

    public Consumer toConsumer(String password, Set<MemberRole> roles, String accept) {
        return Consumer.builder()
                .email(this.email)
                .password(password)
                .name(this.name)
                .roles(roles)
                .accept(accept)
                .tempLink("none")
                .build();
    }

    public Shelter toShelter(String password, Set<MemberRole> roles, String accept) {
        return Shelter.builder()
                .email(this.email)
                .password(password)
                .name(this.name)
                .roles(roles)
                .accept(accept)
                .tempLink("none")
                .build();
    }
}
