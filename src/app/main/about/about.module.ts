import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutInfoComponent } from './about-info/about-info.component';
import { CoreModule } from 'app/core/core.module';
import { ContactsComponent } from './contacts/contacts.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { environment } from 'environments/environment';
import { FeedbackService, FeedbackServiceHttp } from 'app/main/about/feedback.service';
import { FeedbackServiceStub } from 'app/main/about/feedback.service.stub';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [AboutComponent, AboutInfoComponent, ContactsComponent, FeedbackComponent],
  exports: [AboutComponent],
  providers: [
    {
      provide: FeedbackService,
      useClass: environment.production ? FeedbackServiceHttp : FeedbackServiceStub
    },
  ]
})
export class AboutModule { }
