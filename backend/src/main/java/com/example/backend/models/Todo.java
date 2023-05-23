package com.example.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "todos")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String todo;
    private Boolean isDone;

    @ManyToOne
    private TodosName todosName;

    public Todo() {
    }

    public Todo(Long id, String todo, Boolean isDone,TodosName todosName) {
        this.id = id;
        this.todo = todo;
        this.isDone = isDone;
        this.todosName = todosName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTodo() {
        return todo;
    }

    public void setTodo(String todo) {
        this.todo = todo;
    }

    public Boolean getDone() {
        return isDone;
    }

    public void setDone(Boolean done) {
        isDone = done;
    }

    public TodosName getTodosName() {
        return todosName;
    }

    public void setTodosName(TodosName todosName) {
        this.todosName = todosName;
    }
}
