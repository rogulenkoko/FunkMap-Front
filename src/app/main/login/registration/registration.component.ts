import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login.service";
import { Router } from "@angular/router";
import { RegistrationModel, RegistrationRequest } from "./registration-model";
import { ConfirmationRequest, ConfirmationResponse } from "./confirmation-model";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private currentStep = 1;

  private login: string = "test";
  private password: string = "1";
  private passwordRepeat: string = "1";

  private email: string;
  private code: string;

  private passwordsAreNotMacthing: boolean;
  private existingLogin: boolean;

  private isCodeSent: boolean;
  private isEmailSent: boolean;

  private isCodeWrong: boolean;

  constructor(private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
  }

  moveNext() {
    if (!this.login || !this.password || !this.passwordRepeat) return;

    if (this.password != this.passwordRepeat) {
      this.passwordsAreNotMacthing = true;
      setTimeout(() => {
        this.passwordsAreNotMacthing = false;
      }, 3000)
      return;
    }

    switch (this.currentStep) {
      case 1:
        var request = new RegistrationRequest(this.login, this.password);
        this.loginService.register(request).subscribe(response => {
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
        var confirmationRequest = new ConfirmationRequest(this.login, this.code);
        this.loginService.confirm(confirmationRequest).subscribe(response => {
          if (response.success) {
            this.currentStep++;
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
    var request = new RegistrationRequest(this.login);
    request.email = this.email
    this.loginService.sendEmail(request).subscribe(response => {
      this.isEmailSent = true;
      if (response.success) {
        this.isCodeSent = true;
      } else {
        this.isCodeSent = false;
      }
    })
  }

  moveBack() {
    this.isEmailSent = false;
    this.currentStep--;
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
