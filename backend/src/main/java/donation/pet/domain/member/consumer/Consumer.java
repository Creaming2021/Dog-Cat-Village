package donation.pet.domain.member.consumer;

import donation.pet.domain.adopt.Adopt;
import donation.pet.domain.member.Member;
import donation.pet.domain.member.MemberRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Entity
@NoArgsConstructor
public class Consumer extends Member {

    @OneToMany(mappedBy = "consumer", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Adopt> adopts = new ArrayList<>();

    @Builder
    public Consumer(Long id, String name, String email, String password, String phoneNumber,
                    String accept, String contractAddress, String profileImage, String tempLink,
                    LocalDateTime tempLinkDate, Set<MemberRole> roles, String privateKey) {
        super(id, name, email, password, phoneNumber, accept, contractAddress, profileImage, tempLink, tempLinkDate, roles, privateKey);
    }

    public void updateConsumer(String name, String password, String phoneNumber) {
        this.setName(name);
        this.setPassword(password);
        this.setPhoneNumber(phoneNumber);
    }

    public void updateProfileImage(String imagePath) {
        setProfileImage(imagePath);
    }
}
