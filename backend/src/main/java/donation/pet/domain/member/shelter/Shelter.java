package donation.pet.domain.member.shelter;

import donation.pet.domain.adopt.Adopt;
import donation.pet.domain.etc.AcceptStatus;
import donation.pet.domain.exchange.Exchange;
import donation.pet.domain.member.Member;
import donation.pet.domain.member.MemberRole;
import donation.pet.domain.pet.AdoptStatus;
import donation.pet.domain.pet.Pet;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Set;

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
    public List<Integer> getMonthlyAdoptionFromYear(int year) {
        List<Integer> monthlyAdoption = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            monthlyAdoption.add(0);
        }
        return null;
    }
}
