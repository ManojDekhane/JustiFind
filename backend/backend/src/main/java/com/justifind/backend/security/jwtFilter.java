package com.justifind.backend.security;

import com.justifind.backend.Model.User;
import com.justifind.backend.Model.Lawyers;
import com.justifind.backend.Model.Ngo;
import com.justifind.backend.repository.UserRepo;
import com.justifind.backend.repository.LawyersRepo;
import com.justifind.backend.repository.NgoRepo;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class jwtFilter extends OncePerRequestFilter {

    @Autowired
    private jwtUtility jwtUtility;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private LawyersRepo lawyerRepo;

    @Autowired
    private NgoRepo ngoRepo;


    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return path.startsWith("/login") || path.startsWith("/register")||path.startsWith("/news")||path.startsWith("/lawyers")||path.startsWith("/ai/chat");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // No token → skip filter
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        String email;
        String role;

        try {
            email = jwtUtility.extractEmail(token);
            role = jwtUtility.extractRole(token);
        } catch (Exception ex) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            Object account = null;

            switch (role) {
                case "user" -> account = userRepo.findByEmail(email);
                case "lawyer" -> account = lawyerRepo.findByEmail(email);
                case "ngo" -> account = ngoRepo.findByEmail(email);
            }

            if (account != null && jwtUtility.validateToken(token, email)) {

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                account, null, Collections.emptyList());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
