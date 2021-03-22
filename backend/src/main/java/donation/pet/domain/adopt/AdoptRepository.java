package donation.pet.domain.adopt;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface AdoptRepository extends JpaRepository<Adopt, Long> {
}
