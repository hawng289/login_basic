package com.example.demo.demo;

import com.example.demo.auth.AuthenticationService;
import com.example.demo.auth.RegisterRequest;
import com.example.demo.user.Role;
import com.example.demo.user.User;
import com.example.demo.user.UserBasic;
import com.example.demo.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;

import static com.example.demo.user.UserBasic.convert;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final UserService userService;
    private final AuthenticationService service;

    @GetMapping
    @PreAuthorize("hasAuthority('admin:read')")
    public List<UserBasic> get(){
        List<User> user = userService.getUsers();
        List<UserBasic> result = new LinkedList<UserBasic>();
        for (User u : user) {
            result.add(convert(u));
        }
        return ResponseEntity.ok(result).getBody();
    }
    @PostMapping
    @PreAuthorize("hasAuthority('admin:create')")
    public String post(
            @RequestParam String firstname,
            @RequestParam String lastname,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String role) {
        try {
            userService.findByEmail(email);
            return "Exist Email.";

        } catch (NoSuchElementException e) {
            RegisterRequest request = new RegisterRequest(firstname, lastname, email, password, Role.valueOf(role));
            return service.register(request).getAccessToken();
        }

    }
    @PutMapping
    @PreAuthorize("hasAuthority('admin:update')")

    public String put() {
        return "PUT:: admin controller";
    }
    @DeleteMapping
    @PreAuthorize("hasAuthority('admin:delete')")
    public String delete(@RequestParam String email) {

        try {
            userService.findByEmail(email);
            userService.deleteByEmail(email);
            return "DELETE:: admin controller";

        } catch (NoSuchElementException e) {
            return "Not Exist Email.";
        }
    }
}
