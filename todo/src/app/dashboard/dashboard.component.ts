import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions, ChartType, Color } from 'chart.js'
import { BaseChartDirective} from 'ng2-charts';
import { Todo } from '../model/todo.components';
import { User } from '../model/user.components';
import { BasicAuthenticationService } from '../service/authentication/basic-authentication.service';
import { TodoDataService } from '../service/data/todo-data.service';

import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{

  // ***Table tab list data***
  // tablist = [
  //   {title: 'BUGS', icon: 'bug_report', head: [{head: 'head'}, {head: 'head'}, {head: 'head'}, {head: 'head'}, {head: 'head'}, {head: 'head'}, {head: 'head'}, {head: 'head'}],  body: [{head: 'body1', ref:'check1'}, {head: 'body1'}, {head: 'body1'}, {head: 'bodi1'}]}, 
  //   {title: 'WEBSITE', icon: 'code', head: [{head: 'head'}, {head: 'head'}, {head: 'head'}, {head: 'head'}, {head: 'head'}, {head: 'head'}, {head: 'head'}, {head: 'head'}],  body: [{head: 'body1', ref:'check2'}, {head: 'body1'}, {head: 'body1'}, {head: 'bodi1'}]}, 
  //   {title: 'SERVER', icon: 'cloud', head: [{head: 'head'}, {head: 'head'}, {head: 'head'}, {head: 'head'}, {head: 'head'}, {head: 'head'}, {head: 'head'}, {head: 'head'}],  body: [{head: 'body1', ref:'check3'}, {head: 'body1'}, {head: 'body1', }, {head: 'bodi1'}]}
  // ];
  
  // dChart:any;
  //tChart:any;

  private username: any;
  user !: User;

  todos!: Todo[];

  todayTodos!: Todo[];
  completedTodos24 !:Todo[];
  availableTodos !: Todo[];
  dueTodayTodos !: Todo[];

  totalTodayTodos = 0;
  totalcompletedTodos24  = 0;
  totalavailableTodos = 0;
  totaldueTodayTodos  = 0;

  weeklyTodos!: Todo[];
  totalWeeklyTodos = 0;
  weeklyTodosIndex = [0,0,0,0,0,0,0];

  threeDaysTodos!: Todo[];
  totalThreeDaysTodos = 0;
  threeDaysTodosIndex = [0,0,0];

  // ***Three Day Task Chart Configuration***
  @ViewChild('threeDayTaskChart')
  tdTaskCanvas!: ElementRef;

  tdTaskChartLabels : BaseChartDirective['labels'] | undefined;
  tdTaskChartDataSet : ChartDataset[] | undefined;
  tdTaskChartOptions : ChartOptions | undefined;
  tdTaskChartType : ChartType = 'line'; 

  // ***Weekly Task Chart Configuration***
  @ViewChild('weeklyTaskChart')
  wTaskCanvas!: ElementRef;

  wTaskChartLabels : BaseChartDirective['labels'] | undefined;
  wTaskChartDataSet : ChartDataset[] | undefined;
  wTaskChartOptions : ChartOptions | undefined;
  wTaskChartType : ChartType = 'bar'; 

  constructor(
    private todoService:TodoDataService,
    private basicAuthenticationService:BasicAuthenticationService
  ) { 
    this.createThreeDayTasksChart();
    this.createWeeklyTasksChart();     
  }
  
  ngOnInit() {
      
  }

  ngAfterViewInit(){
    this.username = this.basicAuthenticationService.getAuthenticatedUser();
    this.user = this.basicAuthenticationService.getAuthenticatedUserData();

    this.retrieveAllTodos();

    // const ctx = this.wTaskCanvas.nativeElement.getContext('2d');
    // const gradientStroke = ctx.createLinearGradient(100, 0, 500, 0);
    // gradientStroke.addColorStop(0, 'rgba(58,123,213,1)');
    // gradientStroke.addColorStop(1, 'rgba(0,210,255,0.3)');
  }

  createThreeDayTasksChart(){
    this.tdTaskChartLabels = ['Today', 'Tomorrow', 'Overmorrow'];
    this.tdTaskChartDataSet = [
      {
        data: [1, 2, 3], 
        label: 'Tasks', 
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)'
        ],
        borderWidth: 1,
        pointRadius: 5,
        fill: true
      }];

    this.tdTaskChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: 4,
      plugins:
      {
        legend:
        {
          display: false
        }
      },
      scales: 
      {
        y:
        {
          beginAtZero: true
        }
      }
    }
  }

  createWeeklyTasksChart(){
    this.wTaskChartLabels = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
    this.wTaskChartDataSet = [
      {
        // data: [1, 2, 3, 5, 2, 6, 2], 
        data: this.weeklyTodosIndex, 
        label: 'Tasks', 
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)'
        ],
        borderWidth: 1,
        pointRadius: 7
      }];

    this.wTaskChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: 4,
      plugins:
      {
        legend:
        {
          display: false
        }
      },
      scales: 
      {
        y:
        {
          beginAtZero: true,
        }
      }
    }
  }

  // createWeeklyTasksChart(){
  //   this.dChart = new Chart("dTask", {
  //     type: 'bar', //this denotes tha type of chart

  //     data: {// values on X-Axis
  //       labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'], 
	//        datasets: [
  //         {
  //           label: "Tasks",
  //           data: ['1','2', '3', '5', '2', '6', '2'],
  //           backgroundColor: 'blue',
  //           // fill:true
  //         },  
  //       ]
  //     },
  //     options: {
  //       aspectRatio:2,
  //       responsive: true,
  //       maintainAspectRatio:false,
  //       devicePixelRatio: 2,
  //       plugins: {
  //           legend: {
  //             position:'top',
  //             display: false,
  //             labels: {
  //                 // This more specific font property overrides the global property
  //                 // color: 'red',
  //                 font: {
  //                     // family:'arial',
  //                     // style:'italic',
  //                     // size: 14,
  //                     // weight:'light'
  //                 }
  //             }
  //           },
  //       },
  //       scales:{
  //         y:{
  //           ticks:{
  //             // callback: function(value){
  //             //   return "$" + value;
  //             // }
  //           }
  //         }
  //       }
  //     }
      
  //   });
  // }

  // createTTasksChart(){
  //   this.tChart = new Chart("tTask", {
  //     type: 'line', //this denotes tha type of chart

  //     data: {// values on X-Axis
  //       labels: ['Today', 'Tomorrow', 'Overmorrow'], 
	//        datasets: [
  //         {
  //           label: "Tasks",
  //           data: ['5', '2', '1'],
  //           backgroundColor: 'blue'
  //         },  
  //       ]
  //     },
  //     options: {
  //       aspectRatio:2,
  //       responsive: true,
  //       maintainAspectRatio:false,
  //       devicePixelRatio: 4
  //     }
      
  //   });
  // }

  // ***DATA SUBSCRIPTIONS***
  retrieveAllTodos(){
    this.todoService.retrieveAllTodos(this.username).subscribe(
      {
        next : (v) => {
          this.todos = v;
          this.todayTodos = this.filterTodayTodos(v);
          this.completedTodos24 = this.filterCompletedTodos(v);
          this.availableTodos = this.filterAvailableTodos(v);
          this.dueTodayTodos = this.filterDueTodos(v);

          this.totalTodayTodos = this.todayTodos.length;
          this.totalcompletedTodos24  = this.completedTodos24.length;
          this.totalavailableTodos = this.availableTodos.length;
          this.totaldueTodayTodos  = this.dueTodayTodos.length;

          this.weeklyTodos = this.filterWeeklyTodos(v);
          this.totalWeeklyTodos = this.weeklyTodos.length;

          this.threeDaysTodos = this.filterTodosWithinThreeDays(v);
          this.totalThreeDaysTodos = this.threeDaysTodos.length;

          this.createWeeklyTasksChart();
          this.createThreeDayTasksChart();
        }
      }
    )    
  }

  filterTodayTodos(todos: Todo[]){
    return todos.filter((todo) => {
        return formatDate(todo.startDate,'yyyy-MM-dd','en_US').includes(formatDate(new Date(),'yyyy-MM-dd','en_US'));
    
    })
  }

  filterCompletedTodos(todos: Todo[]){
    return todos.filter((todo) => {

        if(todo.doneDate){
          return todo.isDone && formatDate(todo.doneDate,'yyyy-MM-dd','en_US').includes(formatDate(new Date(),'yyyy-MM-dd','en_US'));
        }
       return false;
    })
  }

  filterAvailableTodos(todos: Todo[]){
    return todos.filter((todo) => {

      return !todo.isDone;
    
    })
  }

  filterDueTodos(todos: Todo[]){
    return todos.filter((todo) => {

      return formatDate(todo.targetDate,'yyyy-MM-dd','en_US').includes(formatDate(new Date(),'yyyy-MM-dd','en_US'));
    
    })
  }

  filterWeeklyTodos(todos: Todo[]){
    return todos.filter((todo) => {

      let firstAndLastDate = this.firstAndLastDayOfWeek();

      let fomattedFirstDate = formatDate(firstAndLastDate.firstDayDate,'yyyy-MM-dd','en_US');

      let fomattedLastDate = formatDate(firstAndLastDate.lastDayDate,'yyyy-MM-dd','en_US');

      let currentDate = formatDate(todo.startDate,'yyyy-MM-dd','en_US');

      if(currentDate>=fomattedFirstDate && currentDate<=fomattedLastDate){

        let day = new Date(currentDate).getDay();

        this.weeklyTodosIndex[day-1] = this.weeklyTodosIndex[day-1] + 1;

        return true;
      }
      return false;
    })
  }

  filterTodosWithinThreeDays(todos: Todo[]){
    return todos.filter((todo) => {

      let currentDate = formatDate(todo.startDate,'yyyy-MM-dd','en_US');

      let yesterAndTomorrowDate = this.yesterdayAndTomorrow(currentDate);

      let fomattedFirstDate = formatDate(yesterAndTomorrowDate.yesterdayDate,'yyyy-MM-dd','en_US');

      let fomattedLastDate = formatDate(yesterAndTomorrowDate.tomorrowDate,'yyyy-MM-dd','en_US');

      if(currentDate>fomattedFirstDate && currentDate<fomattedLastDate){
        this.threeDaysTodosIndex[1]++
      }else if(currentDate == fomattedFirstDate){
        this.threeDaysTodosIndex[0]++
      }else if(currentDate == fomattedLastDate){
        this.threeDaysTodosIndex[2]++
      }else{
        return false;
      }

      return true;
    })
  }

  firstAndLastDayOfWeek(){
    let todayDate = new Date();
    let today = todayDate.getDay();
    
    let diff = today >= 1 ?
            today - 1 : 
            6 - today 
    
    let firstDayOfWeek = new Date();
    firstDayOfWeek.setDate(todayDate.getDate() - diff);
    firstDayOfWeek.setHours(0,0,0,0);

    let lastDayOfWeek = new Date();
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
    lastDayOfWeek.setHours(0,0,0,0);

    return {firstDayDate:firstDayOfWeek, lastDayDate:lastDayOfWeek};
  }

  yesterdayAndTomorrow(currentDate: string){
    let date = new Date(currentDate);
    
    let yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    yesterdayDate.setHours(0,0,0,0);

    let tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    tomorrowDate.setHours(0,0,0,0);

    return {yesterdayDate:yesterdayDate, tomorrowDate:tomorrowDate}
  }
}
