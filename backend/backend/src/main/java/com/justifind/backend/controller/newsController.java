package com.justifind.backend.controller;

import com.justifind.backend.services.newsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/news")
@CrossOrigin(origins = "http://localhost:5173")
public class newsController {


    @Autowired
    private final newsService newsService;

    public newsController(newsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping("")
    public List<Map<String,String>> getLegalNews() throws Exception {
        return newsService.fetchLegalNews();
    }
}
