package com.example.backend.services;

import com.example.backend.models.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface TodosNameService {

    TodosName save(TodosName todo);
    ResponseEntity<?> add(TodosName todosName);

    ResponseEntity<?> edit(Long id, TodosNameDto todosNameDto, String username);

    Optional<TodosName> findById(Long id);

    List<TodosNameDto> findAllByUser(User user);

    ResponseEntity<?> delete(Long id, User user);
}
