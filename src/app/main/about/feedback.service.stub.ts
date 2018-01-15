import { Injectable } from '@angular/core';
import { FeedbackService } from 'app/main/about/feedback.service';
import { FeedbackItem } from 'app/main/about/feedback/feedback-item';
import { Observable } from 'rxjs/Observable';
import { BaseResponse } from 'app/tools';

@Injectable()
export class FeedbackServiceStub extends FeedbackService {

  constructor() {
    super();
  }

  sendFeedback(feedback: FeedbackItem): Observable<BaseResponse> {
    if (!feedback.message) return Observable.of(new BaseResponse(false));
    return Observable.of(new BaseResponse(true));
  }

}
