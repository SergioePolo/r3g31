package com.g31.jpa.controller;

import com.g31.jpa.entity.Admin;
import com.g31.jpa.service.AdminService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author desaextremo
 */
@RestController
@RequestMapping("/Admin")
@CrossOrigin(origins = "*")
public class AdminController {
    @Autowired
    private AdminService adminService;
    
    
    @GetMapping("/all")
    public List<Admin> getAdmin(){
        return adminService.getAdmin();
    }
    
    @GetMapping("/{id}")
    public Admin getAdminById(@PathVariable("id") Long idAdm){
        return adminService.getAdminById(idAdm);
    }
    @PostMapping("/save")
    public ResponseEntity saveAdmin(@RequestBody Admin admin){
        adminService.saveAdmin(admin);
        return ResponseEntity.status(201).build();
    }
}
