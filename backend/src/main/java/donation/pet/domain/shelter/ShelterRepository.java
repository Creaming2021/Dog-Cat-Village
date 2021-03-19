package donation.pet.domain.shelter;

import donation.pet.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShelterRepository extends JpaRepository<Shelter, Long> {
    Optional<Shelter> findByEmailAndPassword(String email, String password);
    Optional<Shelter> findByEmail(String email);
}
