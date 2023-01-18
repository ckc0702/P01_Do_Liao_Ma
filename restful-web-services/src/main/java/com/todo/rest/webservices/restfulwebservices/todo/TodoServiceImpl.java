package com.todo.rest.webservices.restfulwebservices.todo;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoServiceImpl implements TodoService{
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private TodoRepository todoRepository;
	
	@Override
	public TodoDto updateTodoIsDone(long id, TodoDto todoDto) {
		
		Todo todo = todoRepository.findById(id).get();
		
		todo.setDone(todoDto.isDone());
		
		TodoDto dto = convertTodoToTodoDto(todo);
		
		todoRepository.save(todo);
		
		return dto;
		
	}
	
	private TodoDto convertTodoToTodoDto(Todo todo) {
		
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		
		TodoDto todoDto = new TodoDto();
		
		todoDto = modelMapper.map(todo, TodoDto.class);
		
		return todoDto;
	}
	
	private Todo convertTodoDtoToEntity(TodoDto todoDto) {
		
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		
		Todo todo = new Todo();
		
		todo = modelMapper.map(todoDto, Todo.class);
		
		return todo;
	}

}
