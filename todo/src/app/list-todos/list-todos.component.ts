import { Component, OnInit, ViewChild} from '@angular/core';

import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { trigger, state, style, animate, transition, group, query, animateChild } from '@angular/animations';

import {CalendarOptions } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'

import { BasicAuthenticationService } from '../service/authentication/basic-authentication.service';

import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../model/todo.components';
import { forkJoin} from 'rxjs';
import { User } from '../model/user.components';

import { formatDate } from '@angular/common';
import { TodoList } from '../model/todolist.components';
import { TodoListDataService } from '../service/data/todo-list-data.service';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css'],
  animations:[
    // animation triggers go here
    trigger('calendarViewAnimation', [
      state('calendarview', style({
        opacity:1,
        height:'100%'
      })),
      state('tasklistview', style({
        opacity:0,
        height:'0',
        padding:0
      })),
      transition('calendarview => tasklistview', [
        animate('1s')
      ]),
      transition('tasklistview => calendarview', [
        animate('1s')
      ])
    ]),
    trigger('taskListViewAnimation', [
      state('tasklistview', style({
        opacity:1,
        height:'100%'
      })),
      state('calendarview', style({
        opacity:0,
        height:'0'
      })),
      transition('tasklistview => calendarview', [
        animate('1s')
      ]),
      transition('calendarview => tasklistview', [
        animate('1s')
      ])
    ])
    ]
})

export class ListTodosComponent implements OnInit {

  private username: any;
  user !: User;
  message: string = '';

  todoData = {}; //Pass to todo modal
  todoListData = {}; //Pass to list modal
  
  // todos!: Todo[];
  listTodos!: TodoList[];
  selectedTodoList!: TodoList;
  selectedTodoListIndex = 0;
  
  selectedTodoListTodos!: Todo[] | null;
  myTodos!: Todo[];

  constructor(
    private todoService:TodoDataService,
    private todoListService:TodoListDataService,
    private modalService: NgbModal,
    private basicAuthenticationService:BasicAuthenticationService
    ) { }

  ngOnInit(): void {
    this.username = this.basicAuthenticationService.getAuthenticatedUser();
    this.user = this.basicAuthenticationService.getAuthenticatedUserData();
    
    this.calendarConfiguration();

    this.retrieveCalendarTodos();

    this.retrieveListTodos();

    this.retrieveAllTodos();
  }


  // ***MODAL CONFIGURATION***
  listModalTitle:any;
  todoModalTitle:any;
  modalRef:any;
  openLg(content: any) {

		this.modalRef = this.modalService.open(content, { size: 'lg' });
    
    this.modalRef.result.then((result: any) => {
      // on close
      this.todoData = {};
      this.todoListData = {};
    }, (reason: any) => {
      // on dismiss
      this.todoData = {};
    }).catch(
      (err:any) => {
        console.log(err);
      }
    )
	}

  
  // TODO CRUD
  onOpenLgAdd(content: any){
    this.todoModalTitle = "Add Todo";

    this.openLg(content);
  }

  onOpenLgListTodoAdd(content: any){
    this.todoModalTitle = "Update Todo";

    let data = {todoListId:this.selectedTodoList.id};

    this.todoData = data;

    this.openLg(content);
  }

  onOpenLgUpdate(content: any, todo: Todo){
    this.todoModalTitle = "Update Todo";

    let data = {id:todo.id, description:todo.description, startDate:todo.startDate, endDate:todo.targetDate};

    this.todoData = data;

    this.openLg(content);
  }


  // LIST CRUD
  onOpenLgListAdd(content: any){
    this.listModalTitle = "Add List";

    this.openLg(content);
  }

  onOpenLgListUpdate(content: any, todoList: TodoList){
    this.listModalTitle = "Update List";

    let todoListData = {id:todoList.id, name:todoList.name, startDate:todoList.startDate, endDate:todoList.targetDate};

    this.todoListData = todoListData;

    this.openLg(content);
  }


  onCloseLg(){
    this.todoData = {};
    this.modalRef.close();
  }


  // ***CALENDAR CONFIGURATION***
  @ViewChild('addTodo') todoModalRef !: string;

  calendarOptions!: CalendarOptions;
  
  events : object[] = [];
  
  calendarConfiguration(){
    // Add one day to end date
    // this.events.forEach(ele => {
    //   ele.end = formatDate(ele.end, 'yyyy-MM-dd', 'en-US');
    // })
    
    this.calendarOptions  = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      weekends: true,
      events: this.events,
      defaultAllDay: true,
      defaultTimedEventDuration: {days: 1},
      selectable:true,
      eventClick: this.toggleCalendarEvent.bind(this),
      dateClick: this.toggleAddCalendarEvent.bind(this),
    }
  }
  
  toggleCalendarEvent(arg : any){
    this.todoModalTitle = "Update Todo";

    //let data = {description:arg.event._def.title, startDate: arg.event.start, endDate: arg.event.end}
    let data = {id:arg.event._def.publicId, description:arg.event._def.title, startDate: arg.event.startStr, endDate: arg.event.endStr};
    
    this.todoData = data;
   
    this.openLg(this.todoModalRef);
  }

  toggleAddCalendarEvent(arg: any){
    this.todoModalTitle = "Add Todo";
    
    let data = {startDate: arg.dateStr, allLists: this.listTodos};

    this.todoData = data;

    this.openLg(this.todoModalRef);
  }

  
  // ***CHANGE VIEW CONFIGURATION***
  isCalendarView = true;

  toggleView(el: HTMLElement){

		this.isCalendarView = !this.isCalendarView;
	
		if(this.isCalendarView == true){
			el.innerHTML = 'add_task';
		}else{
			el.innerHTML = 'calendar_month';
		}
	}

  // ***TODOS LISTS VIEW CONFIGURATION***
  switchTodoList(el: TodoList, i:number){
    this.selectedTodoList = el;
    this.selectedTodoListTodos = el.todos;
    this.selectedTodoListIndex = i;
  }

  // ***MY TODOS FILTER BY DATE RANGE CONFIGURATION***
  filterStartDate!: Date;
  filterEndDate !: Date;
  resetMyTodos(){
    this.retrieveAllTodos();
  }


  // ***DATA SUBSCRIPTIONS***
  retrieveCalendarTodos(){
    let inListTodos = this.todoService.retrieveInListTodos(this.username);
    let notInListTodos = this.todoService.retrieveNotInListTodos(this.username);

    let storeEvents: object[] = []; 

    forkJoin({"inListTodos" : inListTodos, "notInListTodos" : notInListTodos}).subscribe(
      results => {

        results.inListTodos.forEach(ele => {
          let event = {id:ele.id, title:ele.description, start: formatDate(ele.startDate, 'yyy-MM-dd', 'en-US'), end: formatDate(ele.targetDate, 'yyy-MM-dd', 'en-US'), color:'#FFA500'};

          storeEvents.push(event);
        });
        results.notInListTodos.forEach(ele => {
          let event = {id:ele.id, title:ele.description, start: formatDate(ele.startDate, 'yyy-MM-dd', 'en-US'), end: formatDate(ele.targetDate, 'yyy-MM-dd', 'en-US'), color:'#000FF'};
          
          storeEvents.push(event);
        });

        this.events = storeEvents;
        this.calendarOptions.events = this.events;
      }
    )
  }

  retrieveListTodos(){
    this.todoListService.retrieveTodoLists(this.username).subscribe(
      {
        next: (v) => {
          this.listTodos = v;
          if(this.listTodos.length > 0){
            this.selectedTodoList = this.listTodos[0];
            this.selectedTodoListTodos = this.listTodos[0].todos;
          }
        },
        error: (e) => console.log(e)
      }
    )
  }

  retrieveAllTodos(){
    this.todoService.retrieveAllTodos(this.username).subscribe(
      {
        next : (v) => {
          this.myTodos = this.filterMyTodos(v);
        }
      }
    )
    // if(this.filterStartDate != null && this.filterEndDate != null){
    //   this.todoService.retrieveFilteredStartAndTargetDateTodos(this.username, this.filterStartDate, this.filterEndDate).subscribe(
    //     {
    //       next: (v) => console.log(v),
    //       error: (e) => console.log(e)
    //     }
    //   )
    // }else if(this.filterStartDate != null){
    //   this.todoService.retrieveFilteredStartDateTodos(this.username, this.filterStartDate).subscribe(
    //     {
    //       next: (v) => console.log(v),
    //       error: (e) => console.log(e)
    //     }
    //   )
    // }else if(this.filterEndDate != null){
    //   this.todoService.retrieveFilteredEndDateTodos(this.username, this.filterEndDate).subscribe(
    //     {
    //       next: (v) => console.log(v),
    //       error: (e) => console.log(e)
    //     }
    //   )
    // }    
  }

  filterMyTodos(todos: Todo[]){
      return todos.filter((todo) => {
        if(this.filterStartDate && this.filterEndDate){
          return formatDate(todo.startDate,'yyyy-MM-dd','en_US').includes(formatDate(this.filterStartDate,'yyyy-MM-dd','en_US')) && formatDate(todo.targetDate,'yyyy-MM-dd','en_US').includes(formatDate(this.filterEndDate,'yyyy-MM-dd','en_US'));
        }else if(this.filterStartDate){
          return formatDate(todo.startDate,'yyyy-MM-dd','en_US').includes(formatDate(this.filterStartDate,'yyyy-MM-dd','en_US'));
        }else if(this.filterEndDate){
          return formatDate(todo.targetDate,'yyyy-MM-dd','en_US').includes(formatDate(this.filterEndDate,'yyyy-MM-dd','en_US'));
        }else{
          return true;
        }
      })
  }

  // todos!: Todo[];
  // dataSource:any;
  // refreshTodos(){
  //   this.todoService.retrieveAllTodos('kelvin123').subscribe(
  //     {
  //       //next: (v) => this.todos = v
  //       next: (v) => 
  //       {
  //         this.todos = v,
  //         this.dataSource = new MatTableDataSource(this.todos)
  //       }
  //     }
  //   )
  // }

  // displayedColumns = ['description', 'targetDate', 'status', 'action'];

  // deleteTodo(id:number,description:string){
  //   this.todoService.deleteTodo('kelvin123',id).subscribe(
  //     {
  //       next: (v) => 
  //       {
  //         this.message=`Deleted Todo "${description}"!`;
  //         this.refreshTodos();
  //       }
        
  //     }
  //   )
  // }

  // updateTodo(id:number){
  //   this.router.navigate(['todos', id])
  // }

  // createTodo(){
  //   this.router.navigate(['todos', -1])
  // }

}


