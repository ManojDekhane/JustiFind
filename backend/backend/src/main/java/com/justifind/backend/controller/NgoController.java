package com.justifind.backend.controller;

import com.justifind.backend.Model.Ngo;
import com.justifind.backend.services.NgoServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ngo")
public class NgoController {
    @Autowired
    private NgoServices service;

    @PostMapping("/add")
    public Ngo addNgo(@RequestBody Ngo ngo){
        return service.addNgo(ngo);
    }
}
