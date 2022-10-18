package com.g31.jpa.service;

import com.g31.jpa.dto.CountClient;
import com.g31.jpa.dto.StatusAmount;
import com.g31.jpa.entity.Client;
import com.g31.jpa.entity.Reservation;
import com.g31.jpa.repository.ReservationRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author desaextremo
 */
@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    //Metodo para consultar todos los registros (Capa de servicios)
    public List<Reservation> getReservation() {
        return reservationRepository.findAll();
    }

    //Metodo para insertar (Capa de servicios)
    public Reservation insertReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }
    
    //Metodo para consultar una registo x su id (Capa de servicios)
    public Reservation getReservationById(Long id){
            return reservationRepository.findById(id).get();
    }

    //Metodo para eliminar (Capa de servicios)
    public void deleteReservation(Long id){
       reservationRepository.deleteById(id);               
    }
    
    public Reservation updateReservation(Reservation reservation){
        //valido si viene un id en la información de la peticion
        //si no viene retorno la entidad recibida como parametro
        if (reservation.getIdReservation()!=null){
            //valido si el id existe en la base de datos
            Optional<Reservation> opcional = reservationRepository.findById(reservation.getIdReservation());
            
            if (!opcional.isEmpty()){
                //logica
                Reservation reservationBD = opcional.get();
                if (reservation.getClient()!=null) reservationBD.setClient(reservation.getClient());
                if(reservation.getGame()!=null) reservationBD.setGame(reservation.getGame());
                if(reservation.getStartDate()!=null) reservationBD.setStartDate(reservation.getStartDate());
                if(reservation.getDevolutionDate()!=null) reservationBD.setDevolutionDate(reservation.getDevolutionDate());
                if(reservation.getStatus()!=null) reservationBD.setStatus(reservation.getStatus());
                
                return reservationRepository.save(reservationBD);
            }else{
                return reservation;
            }
        }
        return reservation;
        
    }
    //2020-01-01/2020-12-31
    public List<Reservation> getReservationByDates(String fUno, String fDos){
        
        SimpleDateFormat parser=new SimpleDateFormat("yyyy-MM-dd");
        Date a= new Date();
        Date b=new Date();
        
        try {
            a = parser.parse(fUno);
            b = parser.parse(fDos);
        } catch (ParseException ex) {
            Logger.getLogger(ReservationService.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        return reservationRepository.findAllByStartDateAfterAndStartDateBefore(a,b);
    }
    
    public List<Reservation> getReservationByRange(String fUno, String fDos){
        
        SimpleDateFormat parser=new SimpleDateFormat("yyyy-MM-dd");
        Date a= new Date();
        Date b=new Date();
        
        try {
            a = parser.parse(fUno);
            b = parser.parse(fDos);
        } catch (ParseException ex) {
            Logger.getLogger(ReservationService.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
        return reservationRepository.findAllByStartDateBetween(a,b);
    }
    
    public StatusAmount getReservationsStatusReport(){
        List<Reservation>completed=reservationRepository.findAllByStatus("completed");
        List<Reservation>cancelled=reservationRepository.findAllByStatus("cancelled");
        return new StatusAmount(completed.size(),cancelled.size());

    }
    
    public  List<CountClient> getTopClients(){
        List<CountClient>res=new ArrayList<>();
        List<Object[]>report=reservationRepository.countTotalReservationsByClient();
        for(int i=0;i<report.size();i++){
            res.add(new CountClient((Long)report.get(i)[1],(Client) report.get(i)[0]));
        }
        return res;
    }
}
