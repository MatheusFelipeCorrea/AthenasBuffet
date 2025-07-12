package br.com.atenasbuffet.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.atenasbuffet.api.model.Garcom;

@Repository
public interface GarcomRepository extends JpaRepository<Garcom, Long> {
    Optional<Garcom> findByEmail(String email);
}
