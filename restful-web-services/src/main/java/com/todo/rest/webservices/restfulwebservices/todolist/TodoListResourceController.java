package com.todo.rest.webservices.restfulwebservices.todolist;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.todo.rest.webservices.restfulwebservices.user.User;
import com.todo.rest.webservices.restfulwebservices.user.UserRepository;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class TodoListResourceController {
	
	@Autowired
	private TodoListRepository todoListRepository;
	
	@Autowired
	private UserRepository  userRepository;
	
	
	@GetMapping("/users/{username}/read/todolist")
	public List<TodoList> getAllTodoList(@PathVariable String username){
		
		return todoListRepository.findByUserUsername(username);
	}
	
	@GetMapping("/users/{username}/read/todolist/{id}")
	public TodoList getTodoList(@PathVariable String username, @PathVariable long id){
		
		return todoListRepository.findById(id).get();
	}
	
	@PostMapping("/users/{username}/create/todolist")
	public ResponseEntity<Void> createTodoList(@PathVariable String username, @RequestBody TodoList todolist) {
		
		User user = userRepository.findByUsername(username);
		
		todolist.setUser(user);
		
		TodoList result = todoListRepository.save(todolist);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(result.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	@DeleteMapping("/users/{username}/delete/todolist/{id}")
	public ResponseEntity<Void> deleteTodoList(@PathVariable String username, @PathVariable long id){
		
		todoListRepository.deleteById(id);
		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/users/{username}/update/todolist/{id}")
	public ResponseEntity<TodoList> updateTodo(@PathVariable String username, @PathVariable long id, @RequestBody TodoList todolist) {
		
		TodoList result =  todoListRepository.save(todolist);
		
		return new ResponseEntity<TodoList>(result, HttpStatus.OK);
	}
	
	//Testing purpose
//	@GetMapping("/get/test")
//	public TodoList getTodoList(){
//		
//		return todoListRepository.findByTodosId(1L);
//	}
	
}
