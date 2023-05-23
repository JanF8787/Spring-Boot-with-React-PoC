package com.example.backend.services;

import com.example.backend.models.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface TodosNameService {

    TodosName save(TodosName todo);
    ResponseEntity<Responses> add(TodosName todosName);

    Optional<TodosName> findById(Long id);

    List<TodosNameDetails> findAllByUser(User user);

    ResponseEntity<?> delete(Long id, User user);
}
