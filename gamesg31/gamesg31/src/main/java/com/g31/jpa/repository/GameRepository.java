package com.g31.jpa.repository;

import com.g31.jpa.entity.Game;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author desaextremo
 */
public interface GameRepository extends JpaRepository<Game, Long> {
}
