package br.com.atenasbuffet.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.atenasbuffet.api.model.VagaGarcom;

public interface VagaGarcomRepository extends JpaRepository<VagaGarcom, Long> {

    List<VagaGarcom> findByIdBuffet(Long idBuffet);
    
    @Query("SELECT v, b.nomeEstabelecimento FROM VagaGarcom v JOIN Buffet b ON v.idBuffet = b.id")
    List<Object[]> findAllVagasWithBuffetName();

    @Query("SELECT v FROM VagaGarcom v WHERE EXISTS (SELECT c FROM Candidatura c WHERE c.idVaga = v.idVaga)")
    List<VagaGarcom> findVagasComCandidaturas();

}

