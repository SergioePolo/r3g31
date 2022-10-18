package com.g31.jpa.controller;

import com.g31.jpa.entity.User;
import com.g31.jpa.service.UserService;
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
@RequestMapping("/User")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/all")
    public List<User> getUser(){
        return userService.getUser();
    }
    
    @PostMapping("/save")
    public ResponseEntity insertUser(@RequestBody User user){
       userService.insertUser(user);
       return ResponseEntity.status(201).build();
    }
    
    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") Integer id){
        return userService.getUserById(id);
    }
    
    //Metodo para eliminar (Capa de controlador)
    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable("id") Integer id){
       userService.deleteUser(id);
       return ResponseEntity.status(204).build();
    }
    
    //Metodo para actualizar (Capa de controlador)
    @PutMapping("/update")
    public ResponseEntity updateUser(@RequestBody User category){
       userService.updateUser(category);
       return ResponseEntity.status(201).build(); 
    }
    
    @GetMapping("/gender/{gender}")
    public List<User> getUserByGender(@PathVariable("gender") String gender){
        return userService.findByGender(gender);
    }
    
    @GetMapping("/genderjpql/{gender}")
    public List<User> getUserByGenderJpql(@PathVariable("gender") String gender){
        return userService.findByGenderJpql(gender);
    }
    
    @GetMapping("/gendernative/{gender}")
    public List<User> getUserByGenderNative(@PathVariable("gender") String gender){
        return userService.findByGenderNative(gender);
    }
}
