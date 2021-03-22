package donation.pet.domain.exchange;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ExchangeRepository extends JpaRepository<Exchange, Long> {
}
