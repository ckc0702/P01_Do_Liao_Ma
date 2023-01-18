package com.todo.rest.webservices.restfulwebservices.user;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//import javax.persistence.Table;
//import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.ColumnDefault;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.todo.rest.webservices.restfulwebservices.todo.Todo;
import com.todo.rest.webservices.restfulwebservices.todolist.TodoList;


@Entity
@Table(name="users",
uniqueConstraints = {
		@UniqueConstraint(columnNames = "username")
})
@EntityListeners(AuditingEntityListener.class)
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE , generator="user_sequence")
	@SequenceGenerator(name = "user_sequence", sequenceName="user_sequence", initialValue = 4, allocationSize = 1)
	private Long id;
	
	@Column(name="username", nullable=false)
	private String username;
	
	@Column(name="password", nullable=false)
	private String password;
	
	@Column(name="name", nullable=false)
	private String name;
	
	@Column(name="is_demo", nullable=false)
	@ColumnDefault("false")
	private boolean isDemo = false;
	
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
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	@JsonIgnore
	private Set<TodoList> todoList = new HashSet<>();
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	@JsonIgnore
	private Set<Todo> todo = new HashSet<>();
	
	public User() {	}

	public User(Long id, String username, String password, String name, boolean isDemo, String createdBy,
			Date createdDate, String modifyBy, Date modifyDate) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.name = name;
		this.isDemo = isDemo;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
		this.modifyBy = modifyBy;
		this.modifyDate = modifyDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isDemo() {
		return isDemo;
	}

	public void setDemo(boolean isDemo) {
		this.isDemo = isDemo;
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

	public Set<TodoList> getTodoList() {
		return todoList;
	}

	public void setTodoList(Set<TodoList> todoList) {
		this.todoList = todoList;
	}

	public Set<Todo> getTodo() {
		return todo;
	}

	public void setTodo(Set<Todo> todo) {
		this.todo = todo;
	}
	
}
