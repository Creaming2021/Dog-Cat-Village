package donation.pet.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ChatMessageListDto {
    private List<ChatMessageDto> messageList;
}
