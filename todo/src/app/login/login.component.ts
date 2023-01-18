import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/authentication/basic-authentication.service';
import { HardcodedAuthenticationService } from '../service/authentication/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() AVATAR_IMG_URL: any;

  username = "";
  password = "";
  errorMsg = "Invalid Credentials";
  invalidLogin = false;
  rememberMe = false;

  constructor(
    private router: Router, 
    private hardcodedAuthenticationService:HardcodedAuthenticationService, 
    private basicAuthenticationService:BasicAuthenticationService) { 
      let demoCred = this.router.getCurrentNavigation()?.extras.state;
      
      if(demoCred !== undefined){
        this.username = demoCred['username'];
        this.password = demoCred['password'];
      }

    }

  ngOnInit(): void {
    let rememberUsername = this.basicAuthenticationService.getRememberMe();
    
    if(rememberUsername){
      this.username = rememberUsername;
      this.rememberMe = true;
    }
  }

  handleLogin(){
    if(this.hardcodedAuthenticationService.authenticate(this.username, this.password)){
      this.router.navigate(['dashboard', this.username]);
      this.invalidLogin = false;
    }else{
      this.invalidLogin = true;
    }
  }

  handleBasicAuthLogin(){
    this.basicAuthenticationService.executeAuthenticationService(this.username, this.password)
    .subscribe(
      {
        next: (v) => {
          this.router.navigate(['dashboard', this.username]);
          this.invalidLogin = false;
        },
        error: (e) => {
          this.invalidLogin = true;
        }
      }
    )
     
  }

  handleJWTAuthLogin(){
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password, this.rememberMe)
    .subscribe(
      {
        next: (v) => {
          this.router.navigate(['dashboard', this.username]);
          this.invalidLogin = false;
        },
        error: (e) => {
          this.invalidLogin = true;
        }
      }
    )
     
  }

  

}
