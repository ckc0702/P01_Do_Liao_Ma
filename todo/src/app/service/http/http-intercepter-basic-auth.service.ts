import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from '../authentication/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor{

  constructor(private basicAuthenticationService:BasicAuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
    let basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
    
    if(basicAuthHeaderString){
      req = req.clone({
        setHeaders : {
          Authorization : basicAuthHeaderString
        }
      })
    }

    return next.handle(req);
  }
}
