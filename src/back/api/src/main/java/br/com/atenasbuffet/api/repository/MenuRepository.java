package br.com.atenasbuffet.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.atenasbuffet.api.model.Menu;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    @Query("SELECT m FROM Menu m WHERE m.buffetId = :buffetId")
    List<Menu> findMenusByBuffetId(@Param("buffetId") Long buffetId);
}


