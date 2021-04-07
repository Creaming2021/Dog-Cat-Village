package donation.pet.domain.member.shelter;

import donation.pet.domain.adopt.Adopt;
import donation.pet.domain.exchange.Exchange;
import donation.pet.domain.member.Member;
import donation.pet.domain.member.MemberRole;
import donation.pet.domain.pet.Pet;
import donation.pet.dto.shelter.ShelterMainRequestDto;
import donation.pet.dto.shelter.ShelterUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Month;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Entity
@NoArgsConstructor
public class Shelter extends Member {

    private String siteUrl;

    private String introduce;

    @OneToMany(mappedBy = "shelter", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Adopt> adopts = new ArrayList<>();

    @OneToMany(mappedBy = "shelter", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Pet> pets = new ArrayList<>();

    @OneToMany(mappedBy = "shelter", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Exchange> exchanges = new ArrayList<>();

    @Builder
    public Shelter(Long id, String name, String email, String password, String phoneNumber,
                   String accept, String contractAddress, String profileImage, String tempLink,
                   LocalDateTime tempLinkDate, Set<MemberRole> roles, String introduce, String privateKey) {
        super(id, name, email, password, phoneNumber, accept, contractAddress, profileImage, tempLink, tempLinkDate, roles, privateKey);
        this.introduce = introduce;
    }

    //////////////////////////////////////

    // 해당 보호소에서 연도에 맞춰 입양 수 리스트 리턴
    public int[] getMonthlyAdoptionFromYear(int year) {
        int[] monthlyAdoption = new int[12];
        getAdopts().forEach(adopt -> {
            Month month = adopt.getMonthByGivenYearAdopted(year);
            if (month != null) {
                monthlyAdoption[month.getValue() - 1]++;
            }
        });
        return monthlyAdoption;
    }

    public void updateShelter(ShelterUpdateRequestDto dto, String password) {
        introduce = dto.getIntroduce();
        setPhoneNumber(dto.getPhoneNumber());
        setPassword(password);
        setName(dto.getName());
    }

    public void updateProfileImage(String profileImage) {
        setProfileImage(profileImage);
    }

    public void updateMainShelter(ShelterMainRequestDto dto){
        siteUrl = dto.getSiteUrl();
        introduce = dto.getIntroduce();
    }


}
