package donation.pet.domain.exchange;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ExchangeRepository extends JpaRepository<Exchange, Long> {

    Optional<Exchange> findByShelterId(Long ShelterId);

    @Query("select e from Exchange e join fetch e.shelter s")
    List<Exchange> findWithShelter();
}
