import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "./login.service";
import { UserService } from "../user/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  private login: string = "test";
  private password: string = "test";

  private wrongCreds: boolean;

  constructor(private loginService: LoginService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    //this.logIn();
  }

  logIn(){
    this.loginService.login(this.login, this.password).subscribe(response=>{
      if(response.isLogged){
        this.userService.user = response.user;
        this.router.navigate(['/']);
      } else {
        this.wrongCreds = true;
        setTimeout(()=>{
          this.wrongCreds = false;
        }, 3000)
      }
    });
  }

}
