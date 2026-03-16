package com.justifind.backend.repository;

import com.justifind.backend.Model.Ngo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NgoRepo extends MongoRepository<Ngo,String> {
    Ngo findByEmail(String email);

}
