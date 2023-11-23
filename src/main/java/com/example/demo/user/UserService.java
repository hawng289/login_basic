package com.example.demo.user;

import com.example.demo.token.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final TokenRepository tokenRepository;
    public List<User> getUsers() {
        return repository.findAll();
    }
    public void deleteByEmail(String email) {
        User user = findByEmail(email);
        tokenRepository.delete(tokenRepository.findAllByUser(user));
        repository.delete(findByEmail(email));
    }

    public User findByEmail(String email) {
        return repository.findByEmail(email).get();
    }

    public void save(User user) {
        repository.save(user);
    }


}