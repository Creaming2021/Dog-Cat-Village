package donation.pet.dto.consumer;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ConsumerProfileImageDto {
    private MultipartFile file;
}
