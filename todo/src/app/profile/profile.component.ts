import { Component, Input, OnInit } from '@angular/core';
import { UpdateUser } from '../model/update-user.components';
import { User } from '../model/user.components';
import { BasicAuthenticationService } from '../service/authentication/basic-authentication.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
  @Input() DEFAULT_PROFILE_AVATAR_IMG_URL: any;

  private username: any;
  userInfo!: User;
  
  user !: UpdateUser; 

  constructor(
    private basicAuthenticationSerive: BasicAuthenticationService
  ) {}

  ngOnInit(): void {
    this.username = this.basicAuthenticationSerive.getAuthenticatedUser();
    this.userInfo = this.basicAuthenticationSerive.getAuthenticatedUserData();

    this.user = new UpdateUser(this.userInfo.id, this.username, '', this.userInfo.name);
  }
}
