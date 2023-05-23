package com.example.backend.controllers;

import com.example.backend.models.User;
import com.example.backend.models.UserDto;
import com.example.backend.models.Responses;
import com.example.backend.services.UserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RegAndLogController {
    private final UserService userService;

    public RegAndLogController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(path = "/register", produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Responses> register(@RequestBody User user) throws Exception {
        return userService.register(user);
    }

    @GetMapping("/activation/{activationCode}")
    public ResponseEntity<?> activate(@PathVariable String activationCode, Principal principal) {
        return userService.activate(principal.getName(), activationCode);
    }

    @PostMapping("/login")
    public ResponseEntity<Responses> login(@RequestBody UserDto user) {
        return userService.login(user);
    }
}
