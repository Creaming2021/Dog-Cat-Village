package donation.pet.dto.chat;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatListResponseDto {
    private List<ChatRoomInfoDto> chatList;
}
