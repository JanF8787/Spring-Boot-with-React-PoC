package com.example.backend.controllers;

import com.example.backend.models.Responses;
import com.example.backend.models.TodosName;
import com.example.backend.models.TodosNameDto;
import com.example.backend.models.User;
import com.example.backend.services.TodosNameService;
import com.example.backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/todos_name")
public class TodosNameController {

    private final TodosNameService todosNameService;
    private final UserService userService;

    public TodosNameController(TodosNameService todosNameService, UserService userService) {
        this.todosNameService = todosNameService;
        this.userService = userService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody TodosName todosName, Principal principal) {
        Optional<User> user = userService.findByUsernameOrEmail(principal.getName(), principal.getName());

        if(user.get().getActive() == false) {
            return ResponseEntity.badRequest().body(new Responses("errorMessage", "You have to activate your profile first!"));
        }

        TodosName myTodosName = new TodosName(null, todosName.getName(), user.get());
        return todosNameService.add(myTodosName);
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity editTodosName(@PathVariable Long id, @RequestBody TodosNameDto todosNameDto, Principal principal) {
        return todosNameService.edit(id, todosNameDto, principal.getName());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable Long id, Principal principal) {
        Optional<User> user = userService.findByUsernameOrEmail(principal.getName(), principal.getName());
        return todosNameService.delete(id, user.get());
    }
}

