import { Injectable } from '@angular/core';
import { LoginService } from "./login.service";
import { AuthResponse } from "./login-response";
import { Observable } from "rxjs/Observable";
import { User, AuthProvider } from "../user/user";
import { RegistrationRequest, RegistrationModel } from "./registration/registration-model";
import { ConfirmationRequest, ConfirmationResponse } from "./registration/confirmation-model";
import { BaseResponse } from 'app/tools/models/base-response';
import { ConfirmRestoreRequest } from 'app/main/login/restore-password/confirm-restore-request';
import { ExternalSignupRequest } from 'app/main/login/registration/external-signup';

@Injectable()
export class LoginServiceStub extends LoginService {

  constructor() {
    super();
  }

  login(login: string, password: string): Observable<AuthResponse> {
    if (login == "test" && password == "test") {
      var response = new AuthResponse("token", "test");
      return Observable.of(response);
    }
    return Observable.of(new AuthResponse("token", "test"));
  }

  prolongate(refreshToken: string): Observable<AuthResponse> {
    return Observable.of(new AuthResponse("test", "test"))
  }

  signup(request: RegistrationRequest): Observable<ConfirmationResponse> {
    var response = new ConfirmationResponse(true);
    if (request.email == "test") {
      response.success = false;
    }
    return Observable.of(response);
  }

  confirm(request: ConfirmationRequest): Observable<ConfirmationResponse> {
    var response = new ConfirmationResponse(true);
    if (request.code == "1") {
      response.success = false;
    }
    return Observable.of(response);
  }

  askRestoreCode(loginOrEmail: string): Observable<BaseResponse> {

    if (loginOrEmail != "qwe") return Observable.of(new BaseResponse(false));

    return Observable.of(new BaseResponse(true));
  }

  confirmRestore(request: ConfirmRestoreRequest): Observable<BaseResponse> {
    return Observable.of(new BaseResponse(true));
  }

}
