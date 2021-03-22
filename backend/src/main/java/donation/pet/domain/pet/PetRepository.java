package donation.pet.domain.pet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface PetRepository extends JpaRepository<Pet, Long> {
}
