package donation.pet.domain.kakaopay;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KakaopayRepository extends JpaRepository<Kakaopay, Long> {

//    Optional<Kakaopay> findByUrl(String url);
}
