import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { AboutInfoComponent } from './about-info/about-info.component';
import { CoreModule } from 'app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [FeedbackComponent, AboutInfoComponent],
  exports: [FeedbackComponent]
})
export class FeedbackModule { }
