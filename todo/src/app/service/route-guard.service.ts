import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/authentication/hardcoded-authentication.service';
import { BasicAuthenticationService } from './authentication/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private basicAuthenticationService:BasicAuthenticationService, private router:Router) { 

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.basicAuthenticationService.isUserLoggedIn())
      return true;
    
    this.router.navigate(['login']);  

    return false;
  }
}
