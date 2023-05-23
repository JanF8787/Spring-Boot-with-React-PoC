package com.example.backend.services;

import com.example.backend.models.*;
import com.example.backend.repositories.TodoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DatabaseTodoService implements TodoService{

    private final TodoRepository todoRepository;
    private final TodosNameService todosNameService;
    private final UserService userService;

    public DatabaseTodoService(TodoRepository todoRepository, TodosNameService todosNameService, UserService userService) {
        this.todoRepository = todoRepository;
        this.todosNameService = todosNameService;
        this.userService = userService;
    }

    @Override
    public Optional<Todo> findById(Long id) {
        return todoRepository.findById(id);
    }

    @Override
    public Todo save(Todo todo) {
        return todoRepository.save(todo);
    }

    @Override
    public ResponseEntity<?> addTodo(Long id, TodoDto todoDto, String username) {
        Optional<User> user = userService.findByUsernameOrEmail(username, username);
        Optional<TodosName> todosName = todosNameService.findById(id);

        if(!todosName.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new Responses("notPresent", "TodoName with id " +
                            id + " is not present!"));
        }

        if(!todosName.get().getUser().equals(user.get())) {
            return ResponseEntity.badRequest()
                    .body(new Responses("permissionError", "You have not rights to do this!"));
        }

        Todo todo = new Todo(null, todoDto.getTodo(), false, todosName.get());
        todoRepository.save(todo);

        return ResponseEntity.ok(new Responses("success", "Todo was added to the list!"));
    }

    @Override
    public ResponseEntity<?> getTodos(Long id, String username) {
        Optional<TodosName> todosName = todosNameService.findById(id);
        Optional<User> user = userService.findByUsernameOrEmail(username, username);

        if(!todosName.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new Responses("notPresent", "TodoName with id " +
                            id + " is not present!"));
        }

        if(!todosName.get().getUser().equals(user.get())) {
            return ResponseEntity.badRequest()
                    .body(new Responses("permissionError", "You have not rights to do this!"));
        }

        List<Todo> todos = todoRepository.findAllByTodosName(todosName.get());
        List<TodoDto> todoList = new ArrayList<>();

        for(Todo todo : todos) {
            TodoDto todoDto = new TodoDto();
            todoDto.setId(todo.getId());
            todoDto.setTodo(todo.getTodo());
            todoDto.setDone(todo.getDone());

            todoList.add(todoDto);
        }
        return ResponseEntity.ok(todoList);
    }

    @Override
    public ResponseEntity<?> deleteTodo(Long id, String username) {
        Optional<User> user = userService.findByUsernameOrEmail(username, username);
        Optional<Todo> todo = todoRepository.findById(id);

        if(!todo.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new Responses("notPresent", "Todo with id " +
                            id + " is not present!"));
        }

        if(!todo.get().getTodosName().getUser().equals(user.get())) {
            return ResponseEntity.badRequest()
                    .body(new Responses("permissionError", "You have not rights to do this!"));
        }

        todoRepository.deleteById(id);
        return ResponseEntity.ok(new Responses("success", "Deleted!"));
    }

    private Boolean checkData(Optional<User> user, Optional<TodosName> todosName) {

        if(!todosName.isPresent()) {
            System.out.println("not");
            ResponseEntity
                    .badRequest()
                    .body(new Responses("notPresent", "TodoName with id " +
//                            todosName.get().getId() +
                            " is not present!"));
            return false;
        }

        if(!todosName.get().getUser().equals(user.get())) {
            ResponseEntity.badRequest()
                    .body(new Responses("permissionError", "You have not rights to do this!"));
            return false;
        }

        return true;
    }

}
