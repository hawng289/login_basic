package com.example.demo.config;

import com.example.demo.Respository.UserRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
    private final UserRespository userRespository;
    @Bean
    public UserDetailsService userDetailsService(){

        return username -> userRespository.findByEmail(username)
                .orElseThrow(()-> new UsernameNotFoundException("User is not found."));
    }

}
