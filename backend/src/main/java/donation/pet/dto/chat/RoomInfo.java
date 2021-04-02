package donation.pet.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomInfo {
    private String roomId;
    private int used;
    private Long oppId;
    private String oppName;
    private String oppProfileImage;
}
