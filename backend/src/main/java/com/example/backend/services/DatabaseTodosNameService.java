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
    public ResponseEntity<Responses> add(TodosName todosName) {
        if(todosName.getName().isEmpty()) {
            return ResponseEntity.badRequest().body(new Responses("error", "Todos name is empty!"));
        }

        todoNameRepository.save(todosName);
        return ResponseEntity.ok(new Responses("succes", "Todos was created!"));
    }

    @Override
    public Optional<TodosName> findById(Long id) {
        return todoNameRepository.findById(id);
    }

    @Override
    public List<TodosNameDetails> findAllByUser(User user) {

        List<TodosName> myTodosNameByUSer = todoNameRepository.findAllByUser(user);

        List<TodosNameDetails> todosNameDetailsList = new ArrayList<>();

        for(TodosName todo : myTodosNameByUSer) {
            TodosNameDetails todosNameDetails = new TodosNameDetails();
            todosNameDetails.setId(todo.getId());
            todosNameDetails.setName(todo.getName());

            todosNameDetailsList.add(todosNameDetails);
        }

        return todosNameDetailsList;
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
