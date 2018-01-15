import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FeedbackType } from 'app/main/about/feedback/feedback-item';
import { TranslateService } from '@ngx-translate/core';
import { TranslateSelectItem } from 'app/tools/select';

@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  private feedbackTypes: Array<FeedbackTypeItem>;

  private feedbackType: FeedbackType = FeedbackType.Bug;
  private message: string;


  constructor(private translateService: TranslateService) {
    this.feedbackTypes = [
      new FeedbackTypeItem(FeedbackType.Bug, this.translateService.get("About_Bug")),
      new FeedbackTypeItem(FeedbackType.Feature, this.translateService.get("About_Feature")),
      new FeedbackTypeItem(FeedbackType.Another, this.translateService.get("About_Another"))
    ];
   }

  ngOnInit() {
  }

}


export class FeedbackTypeItem extends TranslateSelectItem{
  constructor(public value: FeedbackType, label: string | Observable<string>) {
    super(value, label);
  }
  
}
