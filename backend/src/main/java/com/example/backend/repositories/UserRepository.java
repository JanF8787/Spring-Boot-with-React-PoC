package com.example.backend.repositories;

import com.example.backend.models.TodosName;
import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameOrEmail(String username, String email);
    Optional<User> findByEmail(String email);

    List<TodosName> findTodosNameListByUsername(String user);

    List<TodosName> getTodosNameListByUsername(String username);
}
