import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NewUser } from '../model/new-user.components';
import { UserDataService } from '../service/data/user-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  @Input() AVATAR_IMG_URL: any;

  user !: NewUser; 

  usernameUsed = false;

  constructor(
    private userDataService:UserDataService,
    private router: Router,
    private el: ElementRef
  ){}

  ngOnInit(): void {
    this.user = new NewUser('', '', '');
  }

  registerUser(){
    this.user.name = this.user.username;
    this.userDataService.createUser(this.user).subscribe(
      {
        next: (v) => {
          if(v){
              // alert('Registered successfully!!!');
              this.showSuccessMessage('Register Sucessfully!!!', 'Click "OK" to go to login page', 'success');
              this.router.navigate(['login'], { state: {username: this.user.username, password: ''} });
          }else{
            this.usernameUsed = true;
          }
        }
      }
    )
  }


  hideUsernameUsedMsg(){
    this.usernameUsed = false;
  }

  showSuccessMessage(
    title: any, message: any, icon : any, cancelButtonText = "Close",
    showCancelButton = true){
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: showCancelButton,
      heightAuto: false,
      cancelButtonText: cancelButtonText,
      confirmButtonColor: '#5b86e5',
      // cancelButtonColor: '#5b86e5'
    }).then((e) =>{
      if(e.isConfirmed){
        this.router.navigate(['login'], { state: {username: this.user.username, password: ''} });
      }
    });
  }
}
