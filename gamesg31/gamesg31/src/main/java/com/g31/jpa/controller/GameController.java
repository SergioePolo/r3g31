package com.g31.jpa.controller;

import com.g31.jpa.entity.Game;
import com.g31.jpa.service.GameService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author desaextremo
 */
@RestController
@RequestMapping("/Game")
@CrossOrigin(origins = "*")
public class GameController {
    @Autowired
    private GameService gameService;

    @GetMapping("/all")
    public List<Game> getGameList() {
        return gameService.getGameList();
    }

    @GetMapping("/{id}")
    public Game getGame(@PathVariable("id") Long id) {
        return gameService.getGame(id);
    }
    
    @PostMapping("/save")
    public ResponseEntity saveGame(@RequestBody Game game){
        gameService.saveGame(game);
        return ResponseEntity.status(201).build();
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Game updateGame(@RequestBody Game game){
        return gameService.updateGame(game);        
    }
    
    
    @DeleteMapping("/{id}")
    public ResponseEntity deleteGame(@PathVariable("id") Long id){
       gameService.deleteGame(id);
       return ResponseEntity.status(204).build();
    }
}
