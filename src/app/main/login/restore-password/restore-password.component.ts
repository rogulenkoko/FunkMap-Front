import { Component, OnInit, transition } from '@angular/core';
import { LoginService } from 'app/main/login/login.service';
import { ConfirmationRequest } from 'app/main/login/registration/confirmation-model';
import { ConfirmRestoreRequest } from 'app/main/login/restore-password/confirm-restore-request';
import { User } from 'app/main/user/user';
import { UserService } from 'app/main/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {

  private login: string;

  private codeIsSent: boolean;
  private codeIsSentSuccess: boolean = true;

  private isCodeWrong: boolean;

  private password: string;
  private passwordRepeat: string;
  private code: string;

  private passwordsAreNotMacthing: boolean;

  private currentStep: number = 1;

  constructor(private loginService: LoginService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  private askForRestoreCode(){
    this.loginService.askRestoreCode(this.login).subscribe(response=>{
      this.codeIsSentSuccess = response.success;
      this.codeIsSent = true;

      if(response.success) this.currentStep++;
    });
  }

  private restorePassword(){
    if (this.password != this.passwordRepeat) {
      this.passwordsAreNotMacthing = true;
      setTimeout(() => {
        this.passwordsAreNotMacthing = false;
      }, 3000)
      return;
    }

    this.loginService.confirmRestore(new ConfirmRestoreRequest(this.login, this.code, this.password)).subscribe(response=>{

      if(!response.success){
        alert("confirmation error");
        this.isCodeWrong = true;
        return;
      }

      this.loginService.login(this.login, this.password).subscribe(response => {
        if (response.token) {
          var user = new User();
          user.login = response.login;
          this.userService.setAuthData(response, user);
          // this.userService.user = user;
          this.router.navigate(['/']);
        } else {
          //todo
        }
      });
    });
  }

  private moveNext(){
    if(this.currentStep == 1){
      this.askForRestoreCode();
    } else if(this.currentStep == 2){
      this.restorePassword();
    }
  }

  private back(){
    this.currentStep --;
  }
  

}
