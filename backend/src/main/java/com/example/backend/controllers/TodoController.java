package com.example.backend.controllers;

import com.example.backend.models.*;
import com.example.backend.services.TodoService;
import com.example.backend.services.TodosNameService;
import com.example.backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/todo")
public class TodoController {

    private final TodoService todoService;
    private final TodosNameService todosNameService;

    private final UserService userService;

    public TodoController(TodoService todoService, TodosNameService todosNameService, UserService userService) {
        this.todoService = todoService;
        this.todosNameService = todosNameService;
        this.userService = userService;
    }

    @PostMapping("/{id}/add")
    public ResponseEntity<?> addTodo(@PathVariable Long id, @RequestBody TodoDto todoDto, Principal principal) {
        return todoService.addTodo(id, todoDto, principal.getName());
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<?> editTodo(@PathVariable Long id, @RequestBody TodoDto todoDto, Principal principal) {
        return todoService.editTodo(id, todoDto, principal.getName());
    }

    @GetMapping("/{id}/todos")
    public ResponseEntity<?> getTodoList(@PathVariable Long id, Principal principal) {
        return todoService.getTodos(id, principal.getName());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteTodo(@PathVariable Long id, Principal principal) {
        return todoService.deleteTodo(id, principal.getName());
    }

    @PatchMapping("/{id}/done")
    public ResponseEntity<?> isDone(@PathVariable Long id) {
        Optional<Todo> todo = todoService.findById(id);

        if(!todo.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new Responses("notPresent", "Todo with id " +
                            id + " is not present!"));
        }

        todo.get().setDone(true);
        todoService.save(todo.get());

        TodoDto todoDto = new TodoDto(todo.get().getId(), todo.get().getName(), todo.get().getDone());
        return ResponseEntity.ok(todoDto);
    }

    @PatchMapping("/{id}/not_done")
    public ResponseEntity isNotDone(@PathVariable Long id) {
        Optional<Todo> todo = todoService.findById(id);

        if(!todo.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new Responses("notPresent", "TodoName with id " +
                            id + " is not present!"));
        }

        todo.get().setDone(false);
        todoService.save(todo.get());

        TodoDto todoDto = new TodoDto(todo.get().getId(), todo.get().getName(), todo.get().getDone());
        return ResponseEntity.ok(todoDto);
    }

    @GetMapping("/{todosNameId}/get_info/{todoId}")
    public ResponseEntity getInfo(@PathVariable Long todosNameId, @PathVariable Long todoId) {
        return todoService.getInfo(todosNameId, todoId);
    }


}
