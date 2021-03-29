package donation.pet.domain.pet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {

    @Query("select p from Pet p join fetch p.shelter s")
    List<Pet> findSimplePets();

}
