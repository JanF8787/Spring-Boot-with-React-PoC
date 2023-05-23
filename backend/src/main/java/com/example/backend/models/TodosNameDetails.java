package com.example.backend.models;

public class TodosNameDetails {

    Long id;
    String name;

    public TodosNameDetails(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public TodosNameDetails() {
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

    @Override
    public String toString() {
        return "TodosNameDetails{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
