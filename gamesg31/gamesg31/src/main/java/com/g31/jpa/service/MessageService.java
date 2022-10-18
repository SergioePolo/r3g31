package com.g31.jpa.service;

import com.g31.jpa.entity.Message;
import com.g31.jpa.repository.MessageRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author desaextremo
 */
@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    //Metodo para consultar todos los registros (Capa de servicios)
    public List<Message> getMessage() {
        return messageRepository.findAll();
    }

    //Metodo para insertar (Capa de servicios)
    public Message insertMessage(Message message) {
        return messageRepository.save(message);
    }
    
    //Metodo para consultar una registo x su id (Capa de servicios)
    public Message getMessageById(Long id){
            return messageRepository.findById(id).get();
    }
    //Metodo para eliminar (Capa de servicios)
    public void deleteMessage(Long id){
       messageRepository.deleteById(id);               
    }
    
    public Message updateMessage(Message message){
        //valido si viene un id en la información de la peticion
        //si no viene retorno la entidad recibida como parametro
        if (message.getIdMessage()!=null){
            //valido si el id existe en la base de datos
            Optional<Message> opcional = messageRepository.findById(message.getIdMessage());
            
            if (!opcional.isEmpty()){
                //logica
                Message messageBD = opcional.get();
                
                if (message.getMessageText()!=null) messageBD.setMessageText(message.getMessageText());
                if (message.getClient()!=null) messageBD.setClient(message.getClient());
                if (message.getGame()!=null) messageBD.setGame(message.getGame());
                
                return messageRepository.save(messageBD);
            }else{
                return message;
            }
        }
        return message;
        
    }
}
