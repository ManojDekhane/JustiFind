package com.justifind.backend.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "lawyers")
public class Lawyers {
    @Id
    private String email;
    private String name;
    private String Category;
    private Double longitude;
    private Double latitude;
    private String City;
    private long contact;
    private String password;
    private String role = "lawyer";
    public String getPassword() {
        return password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public void setName(String name) {
        this.name = name;
    }

    public void setCategory(String category) {
        Category = category;
    }

    public void setCity(String city) {
        City = city;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public String getCategory() {
        return Category;
    }

    public String getCity() {
        return City;
    }

    public long getContact() {
        return contact;
    }
}
