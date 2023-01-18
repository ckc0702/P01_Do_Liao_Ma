import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { TodoComponent } from './todo/todo.component';
import { FrontComponent } from './front/front.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'', component: FrontComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'dashboard/:name', component: DashboardComponent, canActivate:[RouteGuardService]},
  {path:'todos', component: ListTodosComponent, canActivate:[RouteGuardService]},
  // {path:'todos/:id', component: TodoComponent, canActivate:[RouteGuardService]},
  {path:'profile/:name', component: ProfileComponent, canActivate:[RouteGuardService]},
  {path:'logout', component: LogoutComponent, canActivate:[RouteGuardService]},
  {path:'**', component: ErrorComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
