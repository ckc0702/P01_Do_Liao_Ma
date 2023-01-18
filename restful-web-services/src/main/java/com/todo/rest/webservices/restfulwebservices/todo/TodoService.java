package com.todo.rest.webservices.restfulwebservices.todo;


public interface TodoService {
	
	TodoDto updateTodoIsDone(long id, TodoDto todoDto);
	
}
