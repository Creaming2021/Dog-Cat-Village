package donation.pet.domain.adopt;

import donation.pet.domain.etc.AcceptStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface AdoptRepository extends JpaRepository<Adopt, Long> {

    long countByAcceptStatusAndStatusDate(AcceptStatus acceptStatus, LocalDate time);

    @Query("select a from Adopt a join fetch a.pet p where a.shelter.id = :shelterId")
    List<Adopt> findByShelter(@Param("shelterId") Long shelterId);

    @Query("select a from Adopt a join fetch a.pet p where a.consumer.id = :consumerId")
    List<Adopt> findByConsumer(@Param("consumerId") Long consumerId);
}
