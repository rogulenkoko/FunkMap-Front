import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FeedbackType, FeedbackItem } from 'app/main/about/feedback/feedback-item';
import { TranslateService } from '@ngx-translate/core';
import { TranslateSelectItem } from 'app/tools/select';
import { FeedbackService } from 'app/main/about/feedback.service';

@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  private feedbackTypes: Array<FeedbackTypeItem>;

  private feedbackType: FeedbackType = FeedbackType.Bug;
  private message: string;

  private feedbackWasSent: boolean;
  private feedbackWasSentSuccessful: boolean;

  constructor(private translateService: TranslateService,
              private feedbackService: FeedbackService) {
    this.feedbackTypes = [
      new FeedbackTypeItem(FeedbackType.Bug, this.translateService.get("About_Bug")),
      new FeedbackTypeItem(FeedbackType.Feature, this.translateService.get("About_Feature")),
      new FeedbackTypeItem(FeedbackType.Another, this.translateService.get("About_Another"))
    ];
   }

  ngOnInit() {
  }

  private send(){
    if(!this.message) return;
    
    var feedback = new FeedbackItem(this.feedbackType, this.message);
    this.feedbackService.sendFeedback(feedback).subscribe(response=>{
      this.feedbackWasSent = true;
      this.feedbackWasSentSuccessful = response.success;

      if(response.success){
        this.clear();
      }

      setTimeout(()=> this.feedbackWasSent = false, 5000);

    });
  }

  private clear(){
    this.feedbackType = FeedbackType.Bug;
    this.message = "";
  }

}


export class FeedbackTypeItem extends TranslateSelectItem{
  constructor(public value: FeedbackType, label: string | Observable<string>) {
    super(value, label);
  }
  
}
