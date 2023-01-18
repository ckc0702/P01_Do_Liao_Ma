package com.todo.rest.webservices.restfulwebservices.todolist;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//import javax.persistence.Table;
//import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.todo.rest.webservices.restfulwebservices.todo.Todo;
import com.todo.rest.webservices.restfulwebservices.user.User;

@Entity
@Table(name="todolist")
@EntityListeners(AuditingEntityListener.class)
public class TodoList {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE , generator="todolist_sequence")
	@SequenceGenerator(name = "todolist_sequence", sequenceName="todolist_sequence", initialValue = 4, allocationSize = 1)
	private Long id;
	
	@Column(name="name", nullable=false)
	private String name;
	
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
	
//	@ManyToOne(fetch = FetchType.EAGER, optional = false)
//	@JoinColumn(name = "user_id", nullable = false)
//	@OnDelete(action = OnDeleteAction.CASCADE)
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
    private User user;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "todoList")
	private Set<Todo> todos = new HashSet<>();

	public TodoList() {}

	public TodoList(Long id, String name, Date startDate, Date targetDate, boolean isDone, Date doneDate,
			String createdBy, Date createdDate, String modifyBy, Date modifyDate, User user) {
		super();
		this.id = id;
		this.name = name;
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<Todo> getTodos() {
		return todos;
	}

	public void setTodos(Set<Todo> todos) {
		this.todos = todos;
	}
	

}
