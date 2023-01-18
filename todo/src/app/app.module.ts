import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AngularMaterialModule} from './app-module-imports/angular-material.module';
import { AngularNgbModule } from './app-module-imports/angular-ngb.module';

import { ChartistModule } from "ng-chartist";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SwiperModule } from 'swiper/angular';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { TodoComponent } from './todo/todo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AppearDirective } from './directive/appear.directive';
import { SquareComponent } from './tic-tac-toe-game/square/square.component';
import { BoardComponent } from './tic-tac-toe-game/board/board.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    ListTodosComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    TodoComponent,
    DashboardComponent,
    ProfileComponent,
    AppearDirective,
    SquareComponent,
    BoardComponent,
    ListTodoComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AngularNgbModule,
    ChartistModule,
    NgChartsModule,
    SwiperModule,
    FullCalendarModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
