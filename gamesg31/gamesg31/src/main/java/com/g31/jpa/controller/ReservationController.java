package com.g31.jpa.controller;

import com.g31.jpa.dto.CountClient;
import com.g31.jpa.dto.StatusAmount;
import com.g31.jpa.entity.Reservation;
import com.g31.jpa.service.ReservationService;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author desaextremo
 */
@RestController
@RequestMapping("/Reservation")
@CrossOrigin(origins = "*")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    //Metodo para consultar todos los registros (Capa de controlador)
    @GetMapping("/all")
    public List<Reservation> getReservation() {
        return reservationService.getReservation();
    }

    //Metodo para consultar una registo x su id (Capa de controlador)
    @GetMapping("/{id}")
    public Reservation getReservationById(@PathVariable("id") Long id) {
        return reservationService.getReservationById(id);
    }

    //Metodo para insertar (Capa de controlador)
    @PostMapping("/save")
    public ResponseEntity insertReservation(@RequestBody Reservation reservation) {
        reservationService.insertReservation(reservation);
        return ResponseEntity.status(201).build();
    }

    //Metodo para eliminar (Capa de controlador)
    @DeleteMapping("/{id}")
    public ResponseEntity deleteReservation(@PathVariable("id") Long id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.status(204).build();
    }
    
    //Metodo para actualizar (Capa de controlador)
    @PutMapping("/update")
    public ResponseEntity updateReservation(@RequestBody Reservation reservation){
       reservationService.updateReservation(reservation);
       return ResponseEntity.status(201).build(); 
    }
           
    @GetMapping("/report-dates/{dateOne}/{dateTwo}")
    public List<Reservation> getReservationsReportDates(@PathVariable("dateOne") String dateOne,@PathVariable("dateTwo") String dateTwo){
        return reservationService.getReservationByDates(dateOne, dateTwo);
    }
    
    @GetMapping("/report-range/{dateOne}/{dateTwo}")
    public List<Reservation> getReservationByRange(@PathVariable("dateOne") String dateOne,@PathVariable("dateTwo") String dateTwo){
        return reservationService.getReservationByRange(dateOne, dateTwo);
    }
    
    @GetMapping("/report-status")
    public StatusAmount getReservationsStatusReport(){
            return reservationService.getReservationsStatusReport();
    }

    @GetMapping("/report-clients")
    public List<CountClient> getReservationsReportClient(){
        return reservationService.getTopClients();
    }
}
