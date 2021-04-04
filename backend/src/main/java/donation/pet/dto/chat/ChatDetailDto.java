package donation.pet.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ChatDetailDto {
    private String roomId;
    private String myId;
    private String oppId;
    private List<ChatMessageDto> messageList;
}
