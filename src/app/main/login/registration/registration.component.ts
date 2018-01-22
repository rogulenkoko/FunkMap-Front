import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login.service";
import { Router } from "@angular/router";
import { RegistrationModel, RegistrationRequest } from "./registration-model";
import { ConfirmationRequest, ConfirmationResponse } from "./confirmation-model";
import { User } from "app/main/user/user";
import { UserService } from "app/main/user/user.service";
import { LanguageService } from 'app/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private currentStep = 1;

  private login: string;
  private name: string;
  private password: string;
  private passwordRepeat: string;

  private isWrongCreds: boolean = false;

  private email: string;
  private code: string;

  private passwordsAreNotMacthing: boolean;
  private existingLogin: boolean;

  private isCodeSent: boolean;
  private isEmailSent: boolean;

  private isCodeWrong: boolean;

  constructor(private loginService: LoginService,
              private router: Router,
              private userService: UserService,
              private translate: LanguageService) { }

  ngOnInit() {
  }

  moveNext() {
    if (!this.login || !this.password || !this.passwordRepeat) {
      this.isWrongCreds = true;
      setTimeout(() => {
        this.isWrongCreds = false;
      }, 3000);
      return;
    }

    if (this.password != this.passwordRepeat) {
      this.passwordsAreNotMacthing = true;
      setTimeout(() => {
        this.passwordsAreNotMacthing = false;
      }, 3000)
      return;
    }

    switch (this.currentStep) {
      case 1:
        this.loginService.validate(this.login).subscribe(response => {
          if (!response.success) {
            this.existingLogin = true;
            setTimeout(() => {
              this.existingLogin = false;
            }, 3000)
          } else {
            this.currentStep++;
          }
        });
        break;

      case 2:
        if (!this.isCodeSent || !this.code) return;
        var confirmationRequest = new ConfirmationRequest(this.login, this.email, this.code);
        this.loginService.confirm(confirmationRequest).subscribe(response => {
          if (response.success) {
            this.logIn();
          } else {
            this.isCodeWrong = true;
            setTimeout(() => {
              this.isCodeWrong = false;
            }, 3000)
          }
        });
        break;

      case 3:

        break;
    }

  }

  sendCode() {
    var request = new RegistrationRequest(this.login, this.email, this.password, this.name, this.translate.language);
    this.loginService.sendEmail(request).subscribe(response => {
      this.isEmailSent = true;
      if (response.success) {
        this.isCodeSent = true;
      } else {
        this.isCodeSent = false;
        setTimeout(() => {
          this.isEmailSent = false;
        }, 3000)
      }
    })
  }

  logIn() {
    this.loginService.login(this.login, this.password).subscribe(response => {
      if (response.token) {
        var user = new User();
        user.login = response.login;
        user.authData = response;
        this.userService.user = user; 
        this.currentStep++;
      } else {
        //todo
      }
    });
  }

  moveBack() {
    this.isEmailSent = false;
    this.currentStep--;
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
