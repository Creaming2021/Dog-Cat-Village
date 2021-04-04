package donation.pet.dto.kakaopay;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KakaoPayReadyDto {

    private String tid;
    private String next_redirect_pc_url;
    private LocalDateTime created_at;
}
