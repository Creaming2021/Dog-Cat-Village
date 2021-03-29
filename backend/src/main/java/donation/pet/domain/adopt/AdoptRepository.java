package donation.pet.domain.adopt;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdoptRepository extends JpaRepository<Adopt, Long> {

    List<Adopt> findAllByCenterId(Long centerId);
}
