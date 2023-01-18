package com.todo.rest.webservices.restfulwebservices.todo;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long>{
	
	List<Todo> findByTodoListUserUsername(String username);
	
	List<Todo> findByTodoListId(long id);
	
	List<Todo> findByUserUsername(String username);
	
	List<Todo> findByUserUsernameAndTodoListIsNull(String username);
	
}
