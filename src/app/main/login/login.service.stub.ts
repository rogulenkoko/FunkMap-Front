import { Injectable } from '@angular/core';
import { LoginService } from "./login.service";
import { LoginResponse } from "./login-response";
import { Observable } from "rxjs/Observable";
import { User } from "../user/user";
import { RegistrationRequest, RegistrationModel } from "./registration/registration-model";
import { ConfirmationRequest, ConfirmationResponse } from "./registration/confirmation-model";

@Injectable()
export class LoginServiceStub extends LoginService {

  constructor() {
    super();
  }

  login(login: string, password: string): Observable<LoginResponse> {
    if (login == "test" && password == "test") {
      var response = new LoginResponse("token", "rogulenkoko");
      return Observable.of(response);
    }
    return Observable.of(new LoginResponse("token", "rogulenkoko"));
  }

  prolongate(refreshToken: string): Observable<LoginResponse>{
     return Observable.of(new LoginResponse("test","test"))
   }

  register(request: RegistrationRequest): Observable<RegistrationModel> {
    var response = new RegistrationModel(true);
    if(request.login == "test"){
      response.success = false;
    }
    return Observable.of(response);
  }

   sendEmail(request: RegistrationRequest): Observable<ConfirmationResponse>{
     var response = new ConfirmationResponse(true);
     if(request.email == "test"){
       response.success = false;
     }
     return Observable.of(response);
   }

   confirm(request: ConfirmationRequest): Observable<ConfirmationResponse>{
     var response = new ConfirmationResponse(true);
     if(request.code == "1"){
       response.success = false;
     }
     return Observable.of(response);
   }

}
