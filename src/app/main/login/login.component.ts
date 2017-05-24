import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  private login: string;
  private password: string;

  private wrongCreds: boolean;

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
  }

  logIn(){
    this.loginService.login(this.login, this.password).subscribe(response=>{
      if(response.isLogged){
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
