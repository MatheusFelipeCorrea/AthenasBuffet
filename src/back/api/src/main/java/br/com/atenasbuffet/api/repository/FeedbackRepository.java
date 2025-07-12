package br.com.atenasbuffet.api.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.atenasbuffet.api.model.Feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    Optional<Feedback> findByIdEvento(Long idEvento); 
     @Query("SELECT f FROM Feedback f WHERE f.idBuffet = :idBuffet")
    List<Feedback> findAllByBuffet(@Param("idBuffet") Long idBuffet);
    List<Feedback> findAllByIdBuffet(Long idBuffet);
    boolean existsByIdEvento(Long idEvento);    
}
