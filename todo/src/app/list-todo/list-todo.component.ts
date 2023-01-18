import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TodoList } from '../model/todolist.components';
import { User } from '../model/user.components';
import { BasicAuthenticationService } from '../service/authentication/basic-authentication.service';
import { TodoListDataService } from '../service/data/todo-list-data.service';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit{

  private username: any;
  user!: User;

  todoList!: TodoList;
  id = -1;

  @Input() todoListData: any;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private todoListService:TodoListDataService,
    private router:Router,
    private basicAuthenticationService:BasicAuthenticationService
    ) { }

  ngOnInit(): void {
    this.username = this.basicAuthenticationService.getAuthenticatedUser();
    this.user = this.basicAuthenticationService.getAuthenticatedUserData();

    this.todoList = new TodoList(-1, '', new Date(), new Date(), false, null, null);

    this.retrieveList();
  }

  // ***DATA SUBSCRIPTIONS***
  retrieveList(){
    if(this.todoListData.hasOwnProperty('id')){
      this.id = this.todoListData.id;
      this.todoListService.retrieveTodoList(this.username, this.id).subscribe(
       {
         next: (v) => {
          this.todoList = v;
          console.log(this.todoList);
         },
         error: (e) => {}
       }
      )
   }
  }

  saveList(){

    if(this.id != -1){
      this.todoListService.updateTodoList(this.username, this.id, this.todoList).subscribe(
        {
          next: (v) => {
            this.close.emit();
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(['todos']));
          },
          error: (e) => {

          }
        }
      )
    }else{
      
      this.todoListService.createTodoList(this.username, this.todoList).subscribe(
        {
          next: (v) => {
            this.close.emit();
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(['todos']));
          },
          error: (e) => {
            
          }
        }
      )  
    }
  }

  deleteList(){
    
    if(this.id != -1){
      this.todoListService.deleteTodoList(this.username, this.id).subscribe(
        {
          next: (v) => {
            this.close.emit();
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(['todos']));
          },
          error: (e) => {
            
          }
        }
      )
    }
  }
    
}
