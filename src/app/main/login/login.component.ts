import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "./login.service";
import { UserService } from "../user/user.service";
import { User } from "../user/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  private login: string = "test";
  private password: string = "1";

  private wrongCreds: boolean;

  constructor(private loginService: LoginService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    
  }

  logIn() {
    this.loginService.login(this.login, this.password).subscribe(response => {
      if (response.token) {
        var user = new User();
        user.login = response.login;
        user.authData = response;
        this.userService.user = user; 
        this.router.navigate(['/']);
      } else {
        this.handleLoginError();
      }
    },
      error => this.handleLoginError());
  }

  handleLoginError() {
    this.wrongCreds = true;
    setTimeout(() => {
      this.wrongCreds = false;
    }, 3000)
  }

}
