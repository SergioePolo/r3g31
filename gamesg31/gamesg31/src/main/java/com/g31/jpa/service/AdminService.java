package com.g31.jpa.service;

import com.g31.jpa.entity.Admin;
import com.g31.jpa.entity.Admin;
import com.g31.jpa.repository.AdminRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author desarrollo
 */
@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;
    
    public List<Admin> getAdmin(){
        return adminRepository.findAll();
    }
    
    public Admin getAdminById(Long idAdm){
        return adminRepository.findById(idAdm).get();
    }
    
    public Admin saveAdmin(Admin admin){
        return adminRepository.save(admin);
    }
}
