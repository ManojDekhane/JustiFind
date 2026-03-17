package com.justifind.backend.services;

import com.justifind.backend.dto.LawyersDTO;
import com.justifind.backend.Model.Lawyers;
import com.justifind.backend.repository.LawyersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class LawyersServices {
    @Autowired
    private LawyersRepo repo;
    public Lawyers addLawyers(Lawyers lawyers) {
        return repo.save(lawyers);
    }

    public List<LawyersDTO> getNearbyLawyers(Double longitude, Double latitude, String category, int limit) {
        List<Lawyers> lawyers = repo.findAll();

        List<LawyersDTO> result = new ArrayList<>();

        for (Lawyers l : lawyers) {

            // Filter by category (case-insensitive)
            if (!l.getCategory().equalsIgnoreCase(category)) {
                continue; // skip
            }

            double dist = calculateDistance(latitude, longitude, l.getLatitude(), l.getLongitude());

            LawyersDTO res = new LawyersDTO();
            res.setContact(l.getContact());
            res.setEmail(l.getEmail());
            res.setName(l.getName());
            res.setCategory(l.getCategory());
            res.setLatitude(l.getLatitude());
            res.setLongitude(l.getLongitude());
            res.setCity(l.getCity());
            res.setDistance(dist);

            result.add(res);
        }

        // sort by nearest distance
        result.sort(Comparator.comparingDouble(LawyersDTO::getDistance));

        // limit count
        return result.stream().limit(limit).toList();
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {

        final int R = 6371; // radius of the Earth in KM

        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

}
