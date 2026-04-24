package com.justifind.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    @Value("${groq.api.key}")
    private String GROQ_API_KEY;

    @PostMapping("/chat")
    public ResponseEntity<?> chat(@RequestBody Map<String, String> body) {

        String userQuery = body.get("query");

        String url = "https://api.groq.com/openai/v1/chat/completions";

        RestTemplate restTemplate = new RestTemplate();

        // Headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(GROQ_API_KEY);

        // Request body
        Map<String, Object> request = new HashMap<>();
        request.put("model", "meta-llama/llama-4-scout-17b-16e-instruct");
        // request.put("model", "mixtral-8x7b-32768");

        List<Map<String, String>> messages = new ArrayList<>();

        messages.add(Map.of(
                "role", "system",
                "content", "You are an Indian legal assistant. Explain laws in simple language. Provide section numbers if possible. Avoid complex legal jargon."
        ));

        messages.add(Map.of(
                "role", "user",
                "content", userQuery
        ));

        request.put("messages", messages);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

        ResponseEntity<Map> response =
                restTemplate.postForEntity(url, entity, Map.class);

        // ✅ CORRECT parsing
        Map bodyMap = response.getBody();
        List choices = (List) bodyMap.get("choices");
        Map firstChoice = (Map) choices.get(0);
        Map message = (Map) firstChoice.get("message");

        String aiResponse = (String) message.get("content");

        return ResponseEntity.ok(Map.of("response", aiResponse));
    }
}