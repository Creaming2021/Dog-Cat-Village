package donation.pet.dto.adopt;

import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.etc.Sex;
import donation.pet.dto.consumer.ConsumerResponseDto;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AdoptResponseDto {

    private Long adoptId;
    private Long petId;
    private String petName;

    private String name; // 신청자 이름
    private Sex sex;
    private String age;
    private String address;
    private String description;
    private String day;
    private String time;
    private AcceptStatus acceptStatus;
    private LocalDateTime createdDate;

    private ConsumerResponseDto consumer;
}
