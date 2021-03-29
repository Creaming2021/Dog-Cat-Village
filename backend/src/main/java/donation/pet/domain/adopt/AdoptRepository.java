package donation.pet.domain.adopt;

import donation.pet.domain.etc.AcceptStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AdoptRepository extends JpaRepository<Adopt, Long> {

    long countByAcceptStatusAndStatusDate(AcceptStatus acceptStatus, LocalDate time);

}
