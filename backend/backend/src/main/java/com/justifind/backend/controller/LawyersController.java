package com.justifind.backend.controller;

import com.justifind.backend.dto.LawyersDTO;
import com.justifind.backend.Model.Lawyers;
import com.justifind.backend.services.LawyersServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/lawyers")
 // allow React frontend
public class LawyersController {
    @Autowired
     private LawyersServices service;
    @PostMapping("/add")
    public Lawyers addlawyers(@RequestBody Lawyers lawyers){
        return service.addLawyers(lawyers);
    }

    @GetMapping("/nearby")
    public List<LawyersDTO> getNearbyLawyers(@RequestParam Double longitude,
                                             @RequestParam Double latitude,
                                             @RequestParam String category,
                                             @RequestParam(defaultValue = "5") int limit
                                          ){
        return service.getNearbyLawyers(longitude,latitude,category,limit);
    }

}
