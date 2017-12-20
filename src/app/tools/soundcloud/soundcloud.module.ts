import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundcloudSearchComponent } from 'app/tools/soundcloud/soundcloud-search/soundcloud-search.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SoundcloudService } from 'app/tools/soundcloud/soundcloud.service';
import { SafeUrlPipe } from './safe-url.pipe';
import { SoundcloudPlaylistComponent } from './soundcloud-playlist/soundcloud-playlist.component';
import { CoreModule } from 'app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    CoreModule
  ],
  declarations: [SoundcloudSearchComponent, SafeUrlPipe, SoundcloudPlaylistComponent],
  exports: [SoundcloudSearchComponent, SoundcloudPlaylistComponent],
  providers: [SoundcloudService]
})
export class SoundcloudModule { }
