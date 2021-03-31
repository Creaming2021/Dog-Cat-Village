package donation.pet.domain.member.shelter;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShelterRepository extends JpaRepository<Shelter, Long> {
    Optional<Shelter> findByEmail(String email);

    boolean existsByName(String name);
}
