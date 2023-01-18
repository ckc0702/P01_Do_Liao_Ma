import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //template: '<h1>{{title}}</h1>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  APP_TITLE = 'DoLiaoMa';
  MAIN_AVATAR_IMG_URL = '/assets/img/login-avatar-main.webp';
  MC_AVATAR_IMG_URL = '/assets/img/login-avatar-mc.jpg';
  MC_COMMENT_AVATAR_IMG_URL = '/assets/img/comment-avatar-mc.jpg';

  onOutletLoaded(component:any){
    component.APP_TITLE = this.APP_TITLE;
    component.AVATAR_IMG_URL = this.MC_AVATAR_IMG_URL;
    component.COMMENT_AVATAR_IMG_URL = this.MC_COMMENT_AVATAR_IMG_URL;
    component.DEFAULT_PROFILE_AVATAR_IMG_URL = this.MC_AVATAR_IMG_URL;
  }
}
