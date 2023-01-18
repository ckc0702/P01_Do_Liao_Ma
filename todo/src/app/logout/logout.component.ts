import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/authentication/basic-authentication.service';
import { HardcodedAuthenticationService } from '../service/authentication/hardcoded-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private basicAuthenticationService:BasicAuthenticationService, private router:Router) { }

  ngOnInit(): void {
    this.basicAuthenticationService.logout();
    this.router.navigate(['']);
  }

}
