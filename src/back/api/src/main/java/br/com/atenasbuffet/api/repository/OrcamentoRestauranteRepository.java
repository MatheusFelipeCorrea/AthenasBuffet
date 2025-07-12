package br.com.atenasbuffet.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.atenasbuffet.api.model.OrcamentoRestaurante;

@Repository
public interface OrcamentoRestauranteRepository extends JpaRepository<OrcamentoRestaurante, Long> {
    List<OrcamentoRestaurante> findByIdCliente(Long idCliente); // Busca por cliente
    List<OrcamentoRestaurante> findByIdBuffet(Long idBuffet);   // Busca por buffet
}
