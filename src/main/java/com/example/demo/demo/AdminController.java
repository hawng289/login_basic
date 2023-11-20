package com.example.demo.demo;

import com.example.demo.config.ApplicationConfig;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    ApplicationConfig applicationConfig;
    private UserRepository userRepository;

    @GetMapping("/")
    @PreAuthorize("hasAuthority('admin:read')")
    public String get() {
        return "GET:: admin controller";
    }
    @PostMapping
    @PreAuthorize("hasAuthority('admin:create')")

    public String post(@RequestBody User userDTO) {
            userDTO.setPassword(applicationConfig.passwordEncoder().encode(userDTO.getPassword()));
            userRepository.save(userDTO); // Lưu người dùng vào cơ sở dữ liệu

            return "User created successfully";
    }
    @PutMapping
    @PreAuthorize("hasAuthority('admin:update')")

    public String put() {
        return "PUT:: admin controller";
    }
    @DeleteMapping
    @PreAuthorize("hasAuthority('admin:delete')")

    public String delete() {
        return "DELETE:: admin controller";
    }
}
