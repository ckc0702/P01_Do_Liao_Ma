import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { NewUser } from 'src/app/model/new-user.components';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http:HttpClient) { }

  createUser(user : NewUser){
    return this.http.post<any>(`${environment.API_URL}/registration`, user);
  }
}
