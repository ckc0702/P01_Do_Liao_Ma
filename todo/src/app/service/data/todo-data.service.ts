import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Todo } from 'src/app/model/todo.components';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http:HttpClient) { }

  retrieveTodo(username:string, todoId:number){ //getTodo()
    return this.http.get<Todo>(`${environment.API_URL}/users/${username}/read/todo/${todoId}`);
  }

  retrieveAllTodos(username:string){ //getAllTodos()
    return this.http.get<Todo[]>(`${environment.API_URL}/users/${username}/read/all/todo`);
  }

  retrieveInListTodos(username:string){ //getTodosInList()
    return this.http.get<Todo[]>(`${environment.API_URL}/users/${username}/todolist/read/todo`);
  }

  retrieveNotInListTodos(username:string){ //getTodosNotInList()
    return this.http.get<Todo[]>(`${environment.API_URL}/users/${username}/read/todo`);
  }

  // retrieveFilteredStartAndTargetDateTodos(username:string, startDate:Date, targetDate:Date){
  //   return this.http.get<Todo[]>(`${environment.API_URL}/users/${username}/filter/start/${startDate}/end/${targetDate}/todo`);
  // } 

  // retrieveFilteredStartDateTodos(username:string, startDate:Date){
  //   return this.http.get<Todo[]>(`${environment.API_URL}/users/${username}/filter/start/${startDate}/todo`);
  // } 

  // retrieveFilteredEndDateTodos(username:string, endDate:Date){
  //   return this.http.get<Todo[]>(`${environment.API_URL}/users/${username}/filter/end/${endDate}/todo`);
  // } 

  createTodo(username:string, todo:Todo){ // createTodo()
    return this.http.post(`${environment.API_URL}/users/${username}/create/todo`, todo);
  }

  createListTodo(username:string, todoListId:number, todo:Todo){ //createListTodo()
    return this.http.post(`${environment.API_URL}/users/${username}/todolist/${todoListId}/create/todo`, todo);
  }

  deleteTodo(username:String, id:number){ //deleteTodo()
    return this.http.delete(`${environment.API_URL}/users/${username}/delete/todo/${id}`);
  }

  updateTodo(username:string, id:number, todo:Todo){ //updateTodo()
    return this.http.put(`${environment.API_URL}/users/${username}/update/todo/${id}`, todo);
  }

  updateTodoIsDone(username:string, id:number, todoDto:object){ //updateTodoIsDone()
    return this.http.patch(`${environment.API_URL}/users/${username}/update/todo/isdone/${id}`, todoDto);
  }
}
