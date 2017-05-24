import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private currentStep = 1;

  private login: string;
  private password: string;
  private passwordRepeat: string;

  private email: string;
  private code: string;

  private passwordsAreNotMacthing: boolean;
  private existingLogin:boolean;

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
  }

  moveNext(){
    if(!this.login || !this.password || !this.passwordRepeat) return; 

    if(this.password != this.passwordRepeat){
      this.passwordsAreNotMacthing = true;
      return;
    }

    switch(this.currentStep){
      case 1:

        break;

      case 2:

        break;

      case 3:

        break;
    }
    this.currentStep ++;
  }

  moveBack(){
    this.currentStep --;
  }

  cancel(){
     this.router.navigate(['/']);
  }

}
