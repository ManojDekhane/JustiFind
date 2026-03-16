package com.justifind.backend.controller;

import com.justifind.backend.Model.*;
import com.justifind.backend.repository.*;
import com.justifind.backend.security.jwtUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController

@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired private UserRepo userRepo;
    @Autowired private LawyersRepo lawyerRepo;
    @Autowired private NgoRepo ngoRepo;
    @Autowired private jwtUtility jwtUtility;
    @Autowired private BCryptPasswordEncoder passwordEncoder;

    // ---------------- REGISTER USER ----------------
    @PostMapping("/register/user")
    public String registerUser(@RequestBody User user) {

        if (userRepo.findByEmail(user.getEmail()) != null) {
            return "ERROR: Email already registered";
        }

        user.setRole("user");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);

        return "SUCCESS: User registered";
    }

    // ---------------- REGISTER LAWYER ----------------
    @PostMapping("/register/lawyer")
    public String registerLawyer(@RequestBody Lawyers lawyer) {

        if (lawyerRepo.findByEmail(lawyer.getEmail()) != null) {
            return "ERROR: Email already registered";
        }

        lawyer.setRole("lawyer");
        lawyer.setPassword(passwordEncoder.encode(lawyer.getPassword()));
        lawyerRepo.save(lawyer);

        return "SUCCESS: Lawyer registered";
    }

    // ---------------- REGISTER NGO ----------------
    @PostMapping("/register/ngo")
    public String registerNgo(@RequestBody Ngo ngo) {

        if (ngoRepo.findByEmail(ngo.getEmail()) != null) {
            return "ERROR: Email already registered";
        }

        ngo.setRole("ngo");
        ngo.setPassword(passwordEncoder.encode(ngo.getPassword()));
        ngoRepo.save(ngo);

        return "SUCCESS: NGO registered";
    }

    // ---------------- LOGIN ----------------
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest req) {

        Object account = null;

        switch (req.getRole()) {
            case "user" -> account = userRepo.findByEmail(req.getEmail());
            case "lawyer" -> account = lawyerRepo.findByEmail(req.getEmail());
            case "ngo" -> account = ngoRepo.findByEmail(req.getEmail());
            default -> {
                return "ERROR: Invalid role";
            }
        }

        if (account == null)
            return "ERROR: User not registered";

        String storedPassword = "";

        if (account instanceof User u) storedPassword = u.getPassword();
        if (account instanceof Lawyers l) storedPassword = l.getPassword();
        if (account instanceof Ngo n) storedPassword = n.getPassword();

        if (!passwordEncoder.matches(req.getPassword(), storedPassword))
            return "ERROR: Invalid password";

        return "SUCCESS:" + jwtUtility.generateToken(req.getEmail(), req.getRole());
    }
}

class LoginRequest {
    private String email;
    private String password;
    private String role;

    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getRole() { return role; }

    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setRole(String role) { this.role = role; }
}
