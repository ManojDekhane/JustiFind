package com.justifind.backend.services;

import com.rometools.rome.feed.synd.SyndEntry;
import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class newsService {
    public List<Map<String, String>> fetchLegalNews() throws Exception {
//        URL feedUrl = new URL("https://www.jurist.org/news/feed/");

        URL feedUrl = new URL("https://www.jurist.org/news/feed/");
        SyndFeedInput input = new SyndFeedInput();
        SyndFeed feed = input.build(new XmlReader(feedUrl));

        List<Map<String, String>> newsList = new ArrayList<>();
        for (SyndEntry entry : feed.getEntries()) {
            Map<String, String> newsItem = new HashMap<>();
            newsItem.put("title", entry.getTitle());
            newsItem.put("link", entry.getLink());
            newsList.add(newsItem);
        }
        return newsList;
    }
}

