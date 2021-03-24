package donation.pet.domain.center;

import donation.pet.domain.exchange.Exchange;
import donation.pet.domain.member.Member;
import donation.pet.domain.pet.Pet;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Center extends Member {

    private String businessNumber;

    private String address;

    @Lob
    private String introduce;

    @OneToMany
    @JoinColumn(name = "center")
    private final List<Pet> pets = new ArrayList<>();

    @OneToMany
    @JoinColumn(name = "center")
    private final List<Exchange> exchanges = new ArrayList<>();

    // center 관련 정보 추가 예정

}
