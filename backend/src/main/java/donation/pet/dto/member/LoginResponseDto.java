package donation.pet.dto.member;

import donation.pet.domain.member.MemberRole;
import lombok.*;

import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LoginResponseDto {

    private String access_token;
    private String token_type;
    private String refresh_token;
    private String expires_in;
    private Long memberId;
    private String memberRole;

    public void updateRole(Set<MemberRole> roles) {
        if (roles.contains(MemberRole.ADMIN)) {
            memberRole = "ADMIN";
        } else if (roles.contains(MemberRole.CONSUMER)) {
            memberRole = "CONSUMER";
        } else if (roles.contains(MemberRole.SHELTER)) {
            memberRole = "SHELTER";
        }
    }
}
