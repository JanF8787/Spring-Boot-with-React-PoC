package com.example.backend.controllers;


import com.example.backend.models.Responses;
import com.example.backend.models.User;
import com.example.backend.models.UserDto;
import com.example.backend.services.TodosNameService;
import com.example.backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final TodosNameService todosNameService;

    public UserController(UserService userService, TodosNameService todosNameService) {
        this.userService = userService;
        this.todosNameService = todosNameService;
    }

    @GetMapping("/my_todos")
    public ResponseEntity<?> myTodos(Principal principal) {
        Optional<User> user = userService.findByUsernameOrEmail(principal.getName(), principal.getName());

        if(user.get().getActive() == false) {
            return ResponseEntity.badRequest().body(new Responses("errorMessage", "You have to activate your profile first!"));
        }

        return ResponseEntity.ok(todosNameService.findAllByUser(user.get()));
    }

    @GetMapping("/getInformation")
    public ResponseEntity<?> getInformation(Principal principal) {
        Optional<User> user = userService.findByUsernameOrEmail((principal.getName()), principal.getName());
        UserDto userDto = new UserDto();
        userDto.setUsername(user.get().getUsername());
        userDto.setActivationCode(user.get().getActivationCode());
        return ResponseEntity.ok(userDto);
    }
}
