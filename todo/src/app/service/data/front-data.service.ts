import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from 'src/app/model/account.components';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FrontDataService {

  constructor(private http:HttpClient) { }

  retrieveAllDemoUserAccount(){
    return this.http.get<Account[]>(`${environment.API_URL}/demo/accounts`);
  }
}
