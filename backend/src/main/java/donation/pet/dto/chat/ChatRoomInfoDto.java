package donation.pet.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomInfoDto {
    private String roomId;
    private String oppName;
    private String recentMsg;
}
