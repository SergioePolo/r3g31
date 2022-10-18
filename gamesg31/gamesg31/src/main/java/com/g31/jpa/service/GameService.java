package com.g31.jpa.service;

import com.g31.jpa.entity.Game;
import com.g31.jpa.repository.GameRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author desaextremo
 */
@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;
     
    public List<Game> getGameList(){
        return gameRepository.findAll();
    }
    
    public Game getGame(Long id){
        return gameRepository.findById(id).get();
    }
    
    public Game saveGame(Game game){
        return gameRepository.save(game);
    }
    
    public Game updateGame(Game game){
        //valido si viene un id en la información de la peticion
        //si no viene retorno la entidad recibida como parametro
        if (game.getId()!=null){
            //valido si el id existe en la base de datos
            Optional<Game> opcional = gameRepository.findById(game.getId());
            
            if (!opcional.isEmpty()){
                //logica
                Game gameBD = opcional.get();
                
                if (game.getName()!=null) gameBD.setName(game.getName());
                if (game.getCategory()!=null) gameBD.setCategory(game.getCategory());
                if (game.getDescription()!=null) gameBD.setDescription(game.getDescription());
                if (game.getDeveloper()!=null) gameBD.setDeveloper(game.getDeveloper());
                if(game.getYear()!=null) gameBD.setYear(game.getYear());
                return gameRepository.save(gameBD);
            }else{
                return game;
            }
        }
        return game;
        
    }
    
    public void deleteGame(Long id){
        gameRepository.deleteById(id);
    }
}
