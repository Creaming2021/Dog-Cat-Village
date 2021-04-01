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
    private Set<MemberRole> memberRole;
}
