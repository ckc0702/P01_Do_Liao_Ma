import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoList } from 'src/app/model/todolist.components';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoListDataService {

  constructor(private http:HttpClient) { }

  retrieveTodoLists(username:string){ //getAllTodoList()
    return this.http.get<TodoList[]>(`${environment.API_URL}/users/${username}/read/todolist`);
  }

  retrieveTodoList(username:string, id:number){ //getAllTodoList()
    return this.http.get<TodoList>(`${environment.API_URL}/users/${username}/read/todolist/${id}`);
  }

  createTodoList(username:string, todoList:TodoList){ // createTodo()
    return this.http.post(`${environment.API_URL}/users/${username}/create/todolist`, todoList);
  }

  deleteTodoList(username:String, id:number){ //deleteTodo()
    return this.http.delete(`${environment.API_URL}/users/${username}/delete/todolist/${id}`);
  }

  updateTodoList(username:string, id:number, todoList:TodoList){ //updateTodo()
    return this.http.put(`${environment.API_URL}/users/${username}/update/todolist/${id}`, todoList);
  }

}
