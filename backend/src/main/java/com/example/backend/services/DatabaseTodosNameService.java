package com.example.backend.services;

import com.example.backend.models.*;
import com.example.backend.repositories.TodoNameRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DatabaseTodosNameService implements TodosNameService {

    private final TodoNameRepository todoNameRepository;

    private final UserService userService;

    public DatabaseTodosNameService(TodoNameRepository todoNameRepository, UserService userService) {
        this.todoNameRepository = todoNameRepository;
        this.userService = userService;
    }

    @Override
    public TodosName save(TodosName todo) {
        return todoNameRepository.save(todo);
    }

    @Override
    public ResponseEntity<?> add(TodosName todosName) {
        if(todosName.getName().isEmpty()) {
            return ResponseEntity.badRequest().body(new Responses("error", "Todos name is empty!"));
        }

        todoNameRepository.save(todosName);
//        return ResponseEntity.ok(new Responses("succes", "Todos was created!"));
        return ResponseEntity.ok(new TodosNameDto(todosName.getId(), todosName.getName()));
    }

    @Override
    public ResponseEntity<?> edit(Long id, TodosNameDto todosNameDto, String username) {
        Optional<TodosName> todosName = todoNameRepository.findById(id);
        Optional<User> user = userService.findByUsernameOrEmail(username, username);

        if (!todosName.isPresent()) {
            return ResponseEntity.badRequest()
                    .body(new Responses("error", "todosName with id " + id + " is not present!"));
        }

        if (!todosName.get().getUser().getUsername().equals(user.get().getUsername())) {
            return ResponseEntity.badRequest()
                    .body(new Responses("error", "You don't have permission to do that!"));
        }

        if (todosNameDto.getName().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(new Responses("error", "todosName is empty!"));
        }

        todosName.get().setName(todosNameDto.getName());
        todoNameRepository.save(todosName.get());

        return ResponseEntity.ok(todosNameDto);
    }

    @Override
    public Optional<TodosName> findById(Long id) {
        return todoNameRepository.findById(id);
    }

    @Override
    public List<TodosNameDto> findAllByUser(User user) {

        List<TodosName> myTodosNameByUSer = todoNameRepository.findAllByUser(user);

        List<TodosNameDto> todosNameDtoList = new ArrayList<>();

        for(TodosName todo : myTodosNameByUSer) {
            TodosNameDto todosNameDto = new TodosNameDto();
            todosNameDto.setId(todo.getId());
            todosNameDto.setName(todo.getName());

            todosNameDtoList.add(todosNameDto);
        }

        return todosNameDtoList;
    }

    @Override
    public ResponseEntity<Responses> delete(Long id, User user) {
        Optional<TodosName> todosName = todoNameRepository.findById(id);

        if(!todosName.isPresent()) {
            ResponseEntity.badRequest().body(new Responses("error", "TodosName is not present!"));
        }

        if(!todosName.get().getUser().equals(user)) {
            ResponseEntity.badRequest().body(new Responses("UserError", "You dont have permission to delete it!"));
        }

        todoNameRepository.deleteById(id);
        return ResponseEntity.ok(new Responses("succes", "Deleted."));
    }
}
