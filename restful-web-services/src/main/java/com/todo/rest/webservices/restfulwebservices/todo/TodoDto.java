package com.todo.rest.webservices.restfulwebservices.todo;

import lombok.Data;

@Data
public class TodoDto {
	
	private long id;
	private boolean isDone;
	
	public TodoDto() {
		
	}
	
	public TodoDto(long id, boolean isDone) {
		super();
		this.id = id;
		this.isDone = isDone;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public boolean isDone() {
		return isDone;
	}
	public void setDone(boolean isDone) {
		this.isDone = isDone;
	}
}
