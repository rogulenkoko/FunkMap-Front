import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "./login.service";
import { UserService } from "../user/user.service";
import { User, AuthProvider } from "../user/user";
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
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
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
   
  }

  logIn() {
    this.loginService.login(this.login, this.password).subscribe(response => this.onLoggenIn(response), error => this.handleLoginError());
  }

  private onExternalLoggedIn(token: string, provider: AuthProvider){
    this.loginService.externalLogin(token, provider).subscribe(response => this.onLoggenIn(response), error => this.handleLoginError());
  }

  facebookLogin(){
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);

    var subscription = this.authService.authState.subscribe((user: SocialUser) =>{ 
      if(!user) return;
      this.onExternalLoggedIn(user.authToken, AuthProvider.Facebook);
      if(subscription) subscription.unsubscribe();
    });
  }


  googleLogin(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

    var subscription = this.authService.authState.subscribe((user: SocialUser) =>{ 
      if(!user) return;
      this.onExternalLoggedIn(user.authToken, AuthProvider.Google);
      if(subscription) subscription.unsubscribe();
    });
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
