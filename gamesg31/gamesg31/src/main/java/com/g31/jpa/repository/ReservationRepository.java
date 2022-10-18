package com.g31.jpa.repository;

import com.g31.jpa.entity.Reservation;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author desaextremo
 */
public interface ReservationRepository extends JpaRepository<Reservation, Long>{
    public List<Reservation> findAllByStartDateAfterAndStartDateBefore(Date dateOne,Date dateTwo );
    public List<Reservation>findAllByStatus(String status);
    @Query("SELECT c.client, COUNT(c.client) from Reservation AS c group by c.client order by COUNT(c.client) DESC")
    public List<Object[]> countTotalReservationsByClient();
    
    public List<Reservation> findAllByStartDateBetween(Date dateOne,Date dateTwo);
}
