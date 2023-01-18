package com.todo.rest.webservices.restfulwebservices.todo;

import java.util.Date;
import java.util.Objects;

import javax.persistence.*;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.todo.rest.webservices.restfulwebservices.todolist.TodoList;
import com.todo.rest.webservices.restfulwebservices.user.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="todo")
@EntityListeners(AuditingEntityListener.class)
public class Todo {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE , generator="todo_sequence")
	@SequenceGenerator(name = "todo_sequence", sequenceName="todo_sequence", initialValue = 6, allocationSize = 1)
	private Long id;
	
	@Column(name="description", nullable=false)
	private String description;
	
	@Column(name="start_date", nullable=false)
	private Date startDate;
	
	@Column(name="target_date", nullable=true)
	private Date targetDate;
	
	@Column(name="is_done", nullable=false)
	@ColumnDefault("false")
	private boolean isDone = false;
	
	@Column(name="done_date", nullable=true)
	private Date doneDate;
	
	@Column(name="created_by")
	private String createdBy;
	
	@Column(name="created_date")
	@CreatedDate
	private Date createdDate;
	
	@Column(name="modify_by")
	private String modifyBy;
	
	@Column(name="modify_date")
	@LastModifiedDate
	private Date modifyDate;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "todolist_id", nullable = true)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
    private TodoList todoList;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
    private User user;
	
	
	public Todo() {}

	public Todo(Long id, String description, Date startDate, Date targetDate, boolean isDone, Date doneDate,
			String createdBy, Date createdDate, String modifyBy, Date modifyDate, User user) {
		super();
		this.id = id;
		this.description = description;
		this.startDate = startDate;
		this.targetDate = targetDate;
		this.isDone = isDone;
		this.doneDate = doneDate;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
		this.modifyBy = modifyBy;
		this.modifyDate = modifyDate;
		this.user = user;
	}


	public Todo(Long id, String description, Date startDate, Date targetDate, boolean isDone, Date doneDate,
			String createdBy, Date createdDate, String modifyBy, Date modifyDate, TodoList todoList, User user) {
		super();
		this.id = id;
		this.description = description;
		this.startDate = startDate;
		this.targetDate = targetDate;
		this.isDone = isDone;
		this.doneDate = doneDate;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
		this.modifyBy = modifyBy;
		this.modifyDate = modifyDate;
		this.todoList = todoList;
		this.user = user;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(Date targetDate) {
		this.targetDate = targetDate;
	}

	public boolean isDone() {
		return isDone;
	}

	public void setDone(boolean isDone) {
		this.isDone = isDone;
	}

	public Date getDoneDate() {
		return doneDate;
	}

	public void setDoneDate(Date doneDate) {
		this.doneDate = doneDate;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getModifyBy() {
		return modifyBy;
	}

	public void setModifyBy(String modifyBy) {
		this.modifyBy = modifyBy;
	}

	public Date getModifyDate() {
		return modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	public TodoList getTodoList() {
		return todoList;
	}

	public void setTodoList(TodoList todoList) {
		this.todoList = todoList;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
}
