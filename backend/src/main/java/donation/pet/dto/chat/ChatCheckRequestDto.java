package donation.pet.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatCheckRequestDto {
    @NotEmpty
    private Long myId;
    @NotEmpty
    private Long oppId;
}
