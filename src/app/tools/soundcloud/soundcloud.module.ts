import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundcloudSearchComponent } from 'app/tools/soundcloud/soundcloud-search/soundcloud-search.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SoundcloudService } from 'app/tools/soundcloud/soundcloud.service';
import { SafeUrlPipe } from './safe-url.pipe';
import { SoundcloudPlaylistComponent } from './soundcloud-playlist/soundcloud-playlist.component';
import { CoreModule } from 'app/core/core.module';
import { TrackComponent } from 'app/tools/soundcloud/track/track.component';
import { SoundcloudPlayerMiniComponent } from 'app/tools/soundcloud/soundcloud-player-mini/soundcloud-player-mini.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { SoundcloudPlayerComponent } from 'app/tools/soundcloud/soundcloud-player/soundcloud-player.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    CoreModule,
    ClickOutsideModule
  ],
  declarations: [SoundcloudSearchComponent, SafeUrlPipe, SoundcloudPlaylistComponent, TrackComponent, SoundcloudPlayerMiniComponent, SoundcloudPlayerComponent],
  exports: [SoundcloudSearchComponent, SoundcloudPlaylistComponent, TrackComponent, SoundcloudPlayerMiniComponent],
  providers: [SoundcloudService]
})
export class SoundcloudModule { }
