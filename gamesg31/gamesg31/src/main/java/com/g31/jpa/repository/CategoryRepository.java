package com.g31.jpa.repository;

import com.g31.jpa.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author desaextremo
 */
public interface CategoryRepository extends JpaRepository<Category, Long>{
    
}
