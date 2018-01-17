import { Injectable } from '@angular/core';
import { FeedbackItem } from 'app/main/about/feedback/feedback-item';
import { Observable } from 'rxjs/Observable';
import { BaseResponse } from 'app/tools/models/base-response';
import { Http } from '@angular/http';
import { ConfigurationProvider } from 'app/core';
import { ServiceType } from 'app/core/configuration/configuration-provider';

@Injectable()
export abstract class FeedbackService {

  constructor() { }

  abstract sendFeedback(feedback: FeedbackItem): Observable<BaseResponse>;

}

@Injectable()
export class FeedbackServiceHttp extends FeedbackService {

  constructor(private http: Http) {
    super();
   }

   sendFeedback(feedback: FeedbackItem): Observable<BaseResponse>{
     return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}feedback/save`, feedback).map(x=> BaseResponse.ToBaseResponse(x.json()));
   }

}
