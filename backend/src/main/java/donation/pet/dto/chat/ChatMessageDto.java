package donation.pet.dto.chat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import donation.pet.domain.chat.ChatMessage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ChatMessageDto {
    private String roomId;
    private String myId;
    private String oppId;
    private String msg;
    private String date;
    private String oppName;
}
