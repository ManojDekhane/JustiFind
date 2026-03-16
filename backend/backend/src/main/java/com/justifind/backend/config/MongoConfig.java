package com.justifind.backend.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoConfig {

    @Bean
    public MongoClient mongoClient() {
        System.out.println("🔥 USING ATLAS CONFIG 🔥");
        return MongoClients.create(
                "mongodb+srv://shivanikatkar04:JustiFindDatabase@justifind.buirb8w.mongodb.net/JustiFind?retryWrites=true&w=majority"
        );
    }
    @Bean
    public MongoTemplate mongoTemplate(MongoClient mongoClient) {
        return new MongoTemplate(mongoClient, "JustiFind");
    }
}
