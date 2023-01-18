import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { BasicAuthenticationService } from '../service/authentication/basic-authentication.service';

import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../model/todo.components';
import { User } from '../model/user.components';
import { EventEmitter } from '@angular/core';
import { TodoList } from '../model/todolist.components';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  private username: any;
  user!: User;

  todo!: Todo;
  id = -1;

  todoLists!: TodoList[];

  todoListId = -1;

  @Input() todoData: any;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(
    private todoService:TodoDataService,
    // private route:ActivatedRoute,
    private router:Router,
    private basicAuthenticationService:BasicAuthenticationService
    ) { }

  ngOnInit(): void {
    this.username = this.basicAuthenticationService.getAuthenticatedUser();
    this.user = this.basicAuthenticationService.getAuthenticatedUserData();

    // this.todo = new Todo(-1, '', new Date(), new Date(), false, null, null, this.user); 
    this.todo = new Todo(-1, '', new Date(), new Date(), false, null); 

    if(this.todoData.hasOwnProperty('startDate')){ //using this for calendar add event to initialize start and target date according to calendar clicked
      this.todo.startDate = new Date(this.todoData.startDate);
      this.todo.targetDate = this.todo.startDate;
    }

    if(this.todoData.hasOwnProperty('allLists')){ //using this for calendar add event, allow to add to a list
      this.todoLists = this.todoData.allLists;
    }

    if(this.todoData.hasOwnProperty('todoListId')){ //using this to determine if the creating todo belong in a list
      this.todoListId = this.todoData.todoListId;
    }
    
    this.retrieveTodo();
  }

  // ***DATA SUBSCRIPTIONS***
  retrieveTodo(){

    if(this.todoData.hasOwnProperty('id')){
      this.id = this.todoData.id;
      this.todoService.retrieveTodo(this.username, this.id).subscribe(
       {
         next: (v) => {
          this.todo = v;
          // this.todo.user = this.user;
         },
         error: (e) => {}
       }
      )
   }
   //this.id = this.route.snapshot.params['id'];
    // if(this.id != -1){
    //   this.todoService.retrieveTodo('kelvin123', this.id).subscribe(
    //     {
    //       next: (v) => this.todo = v
    //     }
    //   )
    // }
  }

  saveTodo(){
    if(this.id != -1){

      this.todoService.updateTodo(this.username, this.id, this.todo).subscribe(
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
      if(this.todoListId  != -1){
        this.todoService.createListTodo(this.username, this.todoListId, this.todo).subscribe(
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
        this.todoService.createTodo(this.username, this.todo).subscribe(
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

  deleteTodo(){

    if(this.id != -1){
      this.todoService.deleteTodo(this.username, this.id).subscribe(
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
