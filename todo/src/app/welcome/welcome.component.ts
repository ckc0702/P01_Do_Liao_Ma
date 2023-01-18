import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  message = "Some Welcome Message"
  welcomeMessageFromService = ''
  name = ''

  constructor(private route:ActivatedRoute, private service:WelcomeDataService) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name']
  }

  // getWelcomeMessage(){
  //   this.service.executeHelloWorldBeanService().subscribe(
  //     response => this.handleSuccessfulResponse(response),
  //     error => this.handleErrorResponse(error)
  //   );
  // }

  getWelcomeMessage(){
    this.service.executeHelloWorldBeanService().subscribe(
      {
        next: (v) => this.handleSuccessfulResponse(v),
        error: (e) => this.handleErrorResponse(e)
      }

    );
  }

  getWelcomeMessageWithParameter(){
    this.service.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
      {
        next: (v) => this.handleSuccessfulResponse(v),
        error: (e) => this.handleErrorResponse(e)
      }
    );
  }

  handleSuccessfulResponse(response: any){
    this.welcomeMessageFromService = response.message
  }

  handleErrorResponse(error:any){
    this.welcomeMessageFromService = error.error.message
  }

}
