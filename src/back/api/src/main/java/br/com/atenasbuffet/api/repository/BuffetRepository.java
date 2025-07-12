package br.com.atenasbuffet.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.atenasbuffet.api.model.Buffet;


@Repository
public interface BuffetRepository extends JpaRepository<Buffet, Long> {
    Optional<Buffet> findByEmail(String email);
}
