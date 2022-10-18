package com.g31.jpa.repository;

import com.g31.jpa.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author desaextremo
 */
public interface ClientRepository extends JpaRepository<Client, Long>{
    
}
