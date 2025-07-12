package br.com.atenasbuffet.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.atenasbuffet.api.model.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByEmail(String email); // Buscar cliente pelo email
    boolean existsByNomeAndCpf(String nome, String cpf); // Ve se tem o Nome e CPF
    Optional<Cliente> findByNomeAndCpf(String nome, String cpf); //achar pelo nome e CPF
}
