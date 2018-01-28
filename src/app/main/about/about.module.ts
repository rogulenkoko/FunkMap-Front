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
import { ToolsModule } from 'app/tools/tools.module';
import { DonatComponent } from 'app/main/about/donat/donat.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ToolsModule
  ],
  declarations: [AboutComponent, AboutInfoComponent, ContactsComponent, FeedbackComponent, DonatComponent],
  exports: [AboutComponent],
  providers: [
    {
      provide: FeedbackService,
      useClass: environment.useServer ? FeedbackServiceHttp : FeedbackServiceStub
    },
  ]
})
export class AboutModule { }
