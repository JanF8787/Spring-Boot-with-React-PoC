package com.example.backend.repositories;

import com.example.backend.models.Todo;
import com.example.backend.models.TodosName;
import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TodoNameRepository extends JpaRepository<TodosName, Long> {

    Optional<TodosName> findTodosNameByName(String todosName);

    List<TodosName> getNameByUser(User user);

    List<TodosName> findAllByUser(User user);
}
