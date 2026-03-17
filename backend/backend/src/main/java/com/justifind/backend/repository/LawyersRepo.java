package com.justifind.backend.repository;

import com.justifind.backend.Model.Lawyers;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LawyersRepo extends MongoRepository<Lawyers,String> {
     Lawyers findByEmail(String email);
}
