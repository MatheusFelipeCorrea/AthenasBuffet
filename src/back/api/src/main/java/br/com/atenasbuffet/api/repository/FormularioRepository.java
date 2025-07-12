package br.com.atenasbuffet.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.atenasbuffet.api.model.Formulario;

@Repository
public interface FormularioRepository extends JpaRepository<Formulario, Long> {
    List<Formulario> findByIdBuffet(Long idBuffet);
    @Query("SELECT f, c.nome AS clienteNome FROM Formulario f JOIN f.cliente c WHERE f.idBuffet = :idBuffet")
    List<Object[]> findEventosByBuffetWithClienteNome(@Param("idBuffet") Long idBuffet);
    List<Formulario> findByIdCliente(Long idCliente);

}
