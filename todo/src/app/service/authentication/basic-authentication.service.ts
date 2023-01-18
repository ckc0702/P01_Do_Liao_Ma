import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user.components';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http:HttpClient) { }
  
  executeJWTAuthenticationService(username : string, password : string, rememberMe : boolean){

    return this.http.post<any>(`${environment.API_URL}/authenticate`
    ,{username,password}).pipe(
      map(
        data => {
          sessionStorage.setItem(environment.AUTHENTICATEDUSER, username);
          sessionStorage.setItem(environment.TOKEN, `Bearer ${data.tokenData.token}`);
      
          let user = new User(data.userData.id, data.userData.name, data.userData.demo);

          sessionStorage.setItem(environment.USERDATA, JSON.stringify(user));

          if(rememberMe){
            localStorage.setItem(environment.REMEMBER_ME, username);
          }else{
            localStorage.clear();
          }

          return data.tokenData;
        }
      )
    );
  }

  executeAuthenticationService(username : string, password : string){
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password); //encrpyt base 64

    let header = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })

    return this.http.get<AuthenticationBean>(`${environment.API_URL}/basicAuth`,{headers:header}).pipe(
      map(
        data => {
          sessionStorage.setItem(environment.AUTHENTICATEDUSER, username);
          sessionStorage.setItem(environment.TOKEN, basicAuthHeaderString);
          return data;
        }
      )
    );
  }

  getAuthenticatedUser(){
    return sessionStorage.getItem(environment.AUTHENTICATEDUSER);
  }

  getAuthenticatedToken(){
    if(this.getAuthenticatedUser()){
      return sessionStorage.getItem(environment.TOKEN);
    }
    return null;
  }

  getAuthenticatedUserData(){
    let user = sessionStorage.getItem(environment.USERDATA);

    if(user === null){
      return null;
    }else{
      return JSON.parse(user);
    }
  }

  getRememberMe(){
    return localStorage.getItem(environment.REMEMBER_ME);
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem(environment.AUTHENTICATEDUSER);
    return !(user === null);
  }

  logout(){
    sessionStorage.removeItem(environment.AUTHENTICATEDUSER);
    sessionStorage.removeItem(environment.TOKEN);
    sessionStorage.removeItem(environment.USERDATA);
  }
}

export class AuthenticationBean{
  constructor(public message:string){}
}
