package donation.pet.domain.member;

import donation.pet.domain.member.consumer.Consumer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    Optional<Member> findByName(String name);
    Optional<Member> findByAccept(String token);
    Optional<Member> findByTempLink(String token);

    List<Member> findByContractAddressIn(List<String> addressList);
}
