import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "./login.service";
import { UserService } from "../user/user.service";
import { User, AuthProvider } from "../user/user";
import { AuthResponse } from 'app/main/login/login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  private login: string;
  private password: string;
  
  private wrongCreds: boolean = false;

  constructor(private loginService: LoginService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
   
  }

  logIn() {
    this.loginService.login(this.login, this.password).subscribe(response => this.onLoggenIn(response), error => this.handleLoginError());
  }

  private onLoggenIn(response: AuthResponse){
    if (response.token) {
      var user = new User();
      user.login = response.login;
      this.userService.setAuthData(response, user);
      this.router.navigate(['/']);
    } else {
      this.handleLoginError();
    }
  }

  handleLoginError() {
    this.wrongCreds = true;
    setTimeout(() => {
      this.wrongCreds = false;
    }, 3000)
  }

}
