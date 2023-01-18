package com.todo.rest.webservices.restfulwebservices.todolist;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoListRepository extends JpaRepository<TodoList, Long>{
	List<TodoList> findByUserId(Long id);
	
	List<TodoList> findByUserUsername(String username);
	
//	TodoList findByTodosId(Long id);
}
