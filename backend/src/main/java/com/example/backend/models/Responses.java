package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Responses {

    @JsonProperty("field")
    String field;
    @JsonProperty("message")
    String message;

    public Responses(String field, String message) {
        this.field = field;
        this.message = message;
    }
}
