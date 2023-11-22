package com.example.demo.user;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class UserBasic implements Serializable {
    private String firstname;
    private String lastname;
    private String email;

    private String role;

    public static UserBasic convert(User user) {
        return new UserBasic(user.getFirstname(), user.getLastname(), user.getEmail(), user.getRole().name());
    }

}
