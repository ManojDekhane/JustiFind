package com.justifind.backend.services;

import com.justifind.backend.Model.Ngo;
import com.justifind.backend.repository.NgoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NgoServices {
    @Autowired
    private NgoRepo repo;
    public Ngo addNgo(Ngo ngo){
       return repo.save(ngo);
    }

}
