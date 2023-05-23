package com.example.backend.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "todosName")
public class TodosName {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "todosName", cascade = CascadeType.ALL)
    private List<Todo> todoList;

    public TodosName() {
    }

    public TodosName(Long id, String name, User user) {
        this.id = id;
        this.name = name;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setTodo(String todosName) {
        this.name = todosName;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Todo> getTodoList() {
        return todoList;
    }

    public void setTodoList(List<Todo> todoList) {
        this.todoList = todoList;
    }

    @Override
    public String toString() {
        return "TodosName{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", user=" + user.toString() +
                '}';
    }
}
