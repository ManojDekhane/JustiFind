package com.justifind.backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ngos")
public class Ngo {
    @Id
    private String email;
    private String name;
    private double longitude;
    private double latitude;
    private long contact;
    private String city;
    private String category;
    private String password;
    private String role = "ngo";

    public void setRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setContact(long contact) {
        this.contact = contact;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getEmail() {
        return email;
    }

    public String getCategory() {
        return category;
    }

    public double getLatitude() {
        return latitude;
    }

    public String getName() {
        return name;
    }

    public String getCity() {
        return city;
    }

    public long getContact() {
        return contact;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
