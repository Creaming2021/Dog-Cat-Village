package donation.pet.dto.consumer;

import donation.pet.domain.member.MemberRole;
import donation.pet.domain.member.consumer.Consumer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ConsumerSignupRequestDto {

    private String email;
    private String password;
    private String name;
    private String phoneNumber;

    public Consumer toEntity(String password, Set<MemberRole> Roles, String accept) {
        return Consumer.builder()
                .email(this.email)
                .password(password)
                .name(this.name)
                .roles(Roles)
                .accept(accept)
                .build();
    }
}
