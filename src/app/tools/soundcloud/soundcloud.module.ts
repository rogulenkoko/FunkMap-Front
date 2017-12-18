import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundcloudSearchComponent } from 'app/tools/soundcloud/soundcloud-search/soundcloud-search.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SoundcloudService } from 'app/tools/soundcloud/soundcloud.service';
import { SafeUrlPipe } from './safe-url.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule
  ],
  declarations: [SoundcloudSearchComponent, SafeUrlPipe],
  exports: [SoundcloudSearchComponent],
  providers: [SoundcloudService]
})
export class SoundcloudModule { }
