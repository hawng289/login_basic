package com.example.demo.Respository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRespository extends JpaRepository<User, Integer> {
    Optional<UserDetails> findByEmail(String email);
}
