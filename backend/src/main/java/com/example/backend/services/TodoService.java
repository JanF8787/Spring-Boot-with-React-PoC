package com.example.backend.services;

import com.example.backend.models.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface TodoService {

    Optional<Todo> findById (Long id);
    Todo save (Todo todo);
    ResponseEntity<?> addTodo(Long id, TodoDto todoDto, String username);

    ResponseEntity<?> editTodo(Long id, TodoDto todoDto, String username);

    ResponseEntity<?> getTodos(Long id, String username);

    ResponseEntity<?> deleteTodo(Long id, String username);

    ResponseEntity<?> getInfo(Long todosNameId, Long todoId);

}
