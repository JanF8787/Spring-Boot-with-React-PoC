package com.example.backend.services;

import com.example.backend.models.TodosName;
import com.example.backend.models.User;
import com.example.backend.models.UserDto;
import com.example.backend.models.Responses;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User save(User user);
    Optional<User> findById(Long id);
    Optional<User> findByUsername(String user);
    Optional<User> findByUsernameOrEmail(String username, String email);
    ResponseEntity<Responses> register(User user) throws Exception;
    ResponseEntity<Responses> login(UserDto user);
    ResponseEntity<?> activate(String username, String activationCode);
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
