package com.todo.rest.webservices.restfulwebservices.todo;

import java.net.URI;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.todo.rest.webservices.restfulwebservices.todolist.TodoList;
import com.todo.rest.webservices.restfulwebservices.todolist.TodoListRepository;
import com.todo.rest.webservices.restfulwebservices.user.User;
import com.todo.rest.webservices.restfulwebservices.user.UserRepository;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class TodoResourceController {
	
	@Autowired
	private TodoRepository todoRepository;
	
	@Autowired
	private TodoListRepository todoListRepository;
	
	@Autowired
	private UserRepository  userRepository;
	
	@Autowired
	private TodoService todoService;
	
	@GetMapping("/users/{username}/todolist/{todoListId}/read/todo")
	public List<Todo> getListTodos(@PathVariable String username, @PathVariable long todoListId){
		
		return todoRepository.findByTodoListId(todoListId);
	}
	
	@GetMapping("/users/{username}/read/all/todo")
	public List<Todo> getAllTodos(@PathVariable String username){
	
		return todoRepository.findByUserUsername(username);
	}
	
	@GetMapping("/users/{username}/read/todo")
	public List<Todo> getTodosNotInList(@PathVariable String username){
	
		return todoRepository.findByUserUsernameAndTodoListIsNull(username);
	}
	
	@GetMapping("/users/{username}/todolist/read/todo")
	public List<Todo> getTodosInList(@PathVariable String username){
		
		return todoRepository.findByTodoListUserUsername(username);
	}
	
	@GetMapping("/users/{username}/read/todo/{id}")
	public Todo getTodo(@PathVariable String username, @PathVariable long id){
		
		return todoRepository.findById(id).get();
	}
	
	@PostMapping("/users/{username}/create/todo")
	public ResponseEntity<Void> createTodo(@PathVariable String username, @RequestBody Todo todo) {
		
		User user = userRepository.findByUsername(username);	
		
		todo.setUser(user);
		
		Todo result = todoRepository.save(todo);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(result.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	@PostMapping("/users/{username}/todolist/{todoListId}/create/todo")
	public ResponseEntity<Void> createListTodo(@PathVariable String username, @PathVariable long todoListId, @RequestBody Todo todo) {
		
		TodoList todoList = todoListRepository.findById(todoListId).get();
		
		User user = todoList.getUser();
		
		todo.setUser(user);
		
		todo.setTodoList(todoList);
		
		Todo result = todoRepository.save(todo);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(result.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	@DeleteMapping("/users/{username}/delete/todo/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id){
		
		todoRepository.deleteById(id);
		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/users/{username}/update/todo/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username,  @PathVariable long id, @RequestBody Todo todo) {
		
		Todo existingTodo = todoRepository.findById(id).get();
		
		User user = existingTodo.getUser();
		
		TodoList todoList = existingTodo.getTodoList();
		
		todo.setUser(user);
		todo.setTodoList(todoList);
		
		Todo result =  todoRepository.save(todo);
		
		return new ResponseEntity<Todo>(result, HttpStatus.OK);
	}
	
	@PatchMapping("/users/{username}/update/todo/isdone/{id}")
	public ResponseEntity<TodoDto> updateTodoIsDone(@PathVariable String username, @PathVariable long id, @RequestBody TodoDto todoDto) {
		
		TodoDto dto = todoService.updateTodoIsDone(id, todoDto);
		
		return new ResponseEntity<TodoDto>(dto, HttpStatus.OK);
	}
	
	
	//Testing purpose
//	@GetMapping("/get/test")
//	public Todo updateTodo(){
//		
//	}
//	
//	@PostMapping("/post/test")
//	public ResponseEntity<Void> createTodo(@RequestBody Todo todo) {
//		
//		Todo result = todoRepository.save(todo);
//		
//		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(result.getId()).toUri();
//		
//		return ResponseEntity.created(uri).build();
//	}
//	@PatchMapping("/patch/test")
//	public ResponseEntity<TodoDto> updateIsDoneTest() {
//		
//		TodoDto todoDto = todoService.updateTodoIsDone(1L, new TodoDto(1L, true));
//		
//		return new ResponseEntity<TodoDto>(todoDto, HttpStatus.OK);
//	}
}
