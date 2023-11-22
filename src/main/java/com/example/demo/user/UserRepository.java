package com.example.demo.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);
  <S extends User> S save(S entity);

  @Override
  List<User> findAll();

  @Override
  void delete(User entity);
}
