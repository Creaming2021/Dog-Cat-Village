package donation.pet.dto.shelter;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.Column;
import java.util.List;

@Data
public class ShelterResponseDto {

    private String name;
    private String email;
    private String phoneNumber;
    private String contractAddress;
    private String profileImage;
    private String introduce;

    private int[] monthlyAdoption;

}
