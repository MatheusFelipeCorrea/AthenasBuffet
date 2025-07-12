package br.com.atenasbuffet.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.atenasbuffet.api.model.Candidatura;

@Repository
public interface CandidaturaRepository extends JpaRepository<Candidatura, Long> {
    List<Candidatura> findByIdGarcom(Long idGarcom);
    List<Candidatura> findByIdVaga(Long idVaga); 
    long countByIdVaga(Long idVaga);
    
    @Query("SELECT c, b.nomeEstabelecimento AS nomeBuffet " +
       "FROM Candidatura c " +
       "JOIN VagaGarcom v ON c.idVaga = v.idVaga " +
       "JOIN Buffet b ON v.idBuffet = b.id " +
       "WHERE c.idGarcom = :idGarcom")
    List<Object[]> findCandidaturasWithBuffetName(@Param("idGarcom") Long idGarcom);
    
    @Query("SELECT c, b.nomeEstabelecimento AS nomeBuffet, v.salario, v.jornadaTrabalho " +
           "FROM Candidatura c " +
           "JOIN VagaGarcom v ON c.idVaga = v.idVaga " +
           "JOIN Buffet b ON v.idBuffet = b.id " +
           "WHERE c.idGarcom = :idGarcom")
    List<Object[]> findCandidaturasWithBuffetDetails(@Param("idGarcom") Long idGarcom);


}
