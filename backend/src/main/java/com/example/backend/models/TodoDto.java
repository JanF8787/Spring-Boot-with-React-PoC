package com.example.backend.models;

public class TodoDto {
    private Long id;
    private String name;
    private Boolean isDone;

    public TodoDto() {
    }

    public TodoDto(Long id, String name, Boolean isDone) {
        this.id = id;
        this.name = name;
        this.isDone = isDone;
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

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getDone() {
        return isDone;
    }

    public void setDone(Boolean done) {
        isDone = done;
    }
}
