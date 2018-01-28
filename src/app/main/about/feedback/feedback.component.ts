import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FeedbackType, FeedbackItem } from 'app/main/about/feedback/feedback-item';
import { TranslateService } from '@ngx-translate/core';
import { TranslateSelectItem } from 'app/tools/select';
import { FeedbackService } from 'app/main/about/feedback.service';
import { FileContent } from 'app/main/messenger/models/message';
import { FileUploadFinishedEvent, FileItem } from 'app/tools/upload/upload.component';

@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  public feedbackTypes: Array<FeedbackTypeItem>;

  public feedbackType: FeedbackType = FeedbackType.Bug;
  public message: string;

  public feedbackWasSent: boolean;
  public feedbackWasSentSuccessful: boolean;

  public files: Array<FileContent> = [];

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

  public send(){
    if(!this.message) return;
    
    var feedback = new FeedbackItem(this.feedbackType, this.message, this.files);
    this.feedbackService.sendFeedback(feedback).subscribe(response=>{
      this.feedbackWasSent = true;
      this.feedbackWasSentSuccessful = response.success;

      if(response.success){
        this.clear();
      }

      setTimeout(()=> this.feedbackWasSent = false, 5000);

    });
  }

  public onUploadedStart($event: Array<FileItem>) {

    $event.forEach(item => {
      if (!this.files.find(x => x.name == item.name)) this.files.push(new FileContent(item.name, item.size));
    });
  }

  public onUploadedFinished($event: Array<FileUploadFinishedEvent>) {
    $event.forEach(item => {
      var file = this.files.find(x => x.name == item.name);
      if (file) file.data = item.bytes;
    });
    
  }

  private removeContentItem(item: FileContent) {
    this.files = this.files.filter(x => x.name != item.name);
  }

  private clear(){
    this.feedbackType = FeedbackType.Bug;
    this.message = "";
    this.files = [];
  }

}


export class FeedbackTypeItem extends TranslateSelectItem{
  constructor(public value: FeedbackType, label: string | Observable<string>) {
    super(value, label);
  }
  
}
