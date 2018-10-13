import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "./login.service";
import { UserService } from "../user/user.service";
import { User, AuthProvider } from "../user/user";
import { AuthResponse } from 'app/main/login/login-response';

import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { SoundCloudLoginProvider } from './soundcloud-login-provider';

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
    private userService: UserService,
    private socialAuthService: AuthService,
    private soundCloudService: SoundCloudLoginProvider) { }

  ngOnInit() {

  }

  logIn() {
    this.loginService.login(this.login, this.password).subscribe(response => this.onLoggenIn(response), error => this.handleLoginError());
  }

  private onLoggenIn(response: AuthResponse) {
    if (response.token) {
      var user = new User();
      user.login = response.login;
      this.userService.setAuthData(response, user);
      this.router.navigate(['/']);
    } else {
      this.handleLoginError();
    }
  }

  facebook() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => {
      this.loginService.socialLogin(data.authToken, "facebook").subscribe(response => this.onLoggenIn(response), error => this.handleLoginError());
    });
  }

  google() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      this.loginService.socialLogin(data.idToken, "google").subscribe(response => this.onLoggenIn(response), error => this.handleLoginError());
    });

  }

  soundcloud() {
    this.soundCloudService.signIn().then(data => {
      console.log(data);
      //this.loginService.socialLogin(data.idToken, "google").subscribe(response => this.onLoggenIn(response), error => this.handleLoginError());
    });
  }

  handleLoginError() {
    this.wrongCreds = true;
    setTimeout(() => {
      this.wrongCreds = false;
    }, 3000)
  }

}
