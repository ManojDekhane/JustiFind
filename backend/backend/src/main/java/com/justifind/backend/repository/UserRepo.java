package com.justifind.backend.repository;

import com.justifind.backend.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User,String> {
    User findByName(String name);

    User findByEmail(String email);
}
