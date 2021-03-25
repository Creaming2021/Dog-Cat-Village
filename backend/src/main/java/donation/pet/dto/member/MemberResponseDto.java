package donation.pet.dto.member;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MemberResponseDto {
    private String email;
    private String name;
    private String phone;
}
