package com.example.backend.repositories;

import com.example.backend.models.Todo;
import com.example.backend.models.TodoDto;
import com.example.backend.models.TodosName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findAllByTodosName (TodosName todosName);

}
