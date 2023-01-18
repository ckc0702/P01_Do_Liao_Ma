import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { BasicAuthenticationService } from '../authentication/basic-authentication.service';
import { environment } from 'src/environments/environment';

export class HelloWorldBean{
  constructor(public message:string){}
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http:HttpClient, private basicAuthenticationService:BasicAuthenticationService) { }

  executeHelloWorldBeanService(){
    return this.http.get<HelloWorldBean>(`${environment.API_URL}hello-world-bean`);
  }

  executeHelloWorldServiceWithPathVariable(name:string){
    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    // let header = new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    // })

    // return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${name}`,{headers:header});

    return this.http.get<HelloWorldBean>(`${environment.API_URL}/hello-world/path-variable/${name}`);
  }
}
