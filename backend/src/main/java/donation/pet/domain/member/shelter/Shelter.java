package donation.pet.domain.member.shelter;

import donation.pet.domain.adopt.Adopt;
import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.exchange.Exchange;
import donation.pet.domain.member.Member;
import donation.pet.domain.member.MemberRole;
import donation.pet.domain.pet.AdoptStatus;
import donation.pet.domain.pet.Pet;
import donation.pet.dto.shelter.ShelterUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Month;
import java.util.*;
import java.util.stream.Collectors;

@Getter
@Entity
@NoArgsConstructor
public class Shelter extends Member {

    @Lob
    @Column(name = "shelter_introduce")
    private String introduce;

    @OneToMany(mappedBy = "shelter", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Adopt> adopts = new ArrayList<>();

    @OneToMany(mappedBy = "shelter", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Pet> pets = new ArrayList<>();

    @OneToMany(mappedBy = "shelter", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Exchange> exchanges = new ArrayList<>();

    @Builder
    public Shelter(Long id, String name, String email, String password, String phoneNumber, String accept, String contractAddress, String profileImage, Set<MemberRole> roles, String introduce) {
        super(id, name, email, password, phoneNumber, accept, contractAddress, profileImage, roles);
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

    public void updateShelter(ShelterUpdateRequestDto dto) {
        introduce = dto.getIntroduce();
        setPhoneNumber(dto.getPhoneNumber());
        setName(dto.getName());
        setPassword(dto.getPassword());
    }

    public void updateProfileImage(String fileName) {
        setProfileImage(fileName);
    }

}
