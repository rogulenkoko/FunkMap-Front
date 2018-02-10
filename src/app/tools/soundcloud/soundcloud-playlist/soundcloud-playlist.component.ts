import { Component, OnInit, Input } from '@angular/core';
import { TrackListService } from 'app/tools/soundcloud/track-list.service';
import { Track } from 'app/tools/soundcloud/track';
import { SoundcloudService } from 'app/tools/soundcloud/soundcloud.service';
import { AudioInfo } from 'app/core/models/base-model';

@Component({
  selector: 'soundcloud-playlist',
  templateUrl: './soundcloud-playlist.component.html',
  styleUrls: ['./soundcloud-playlist.component.scss']
})
export class SoundcloudPlaylistComponent implements OnInit {

  @Input() tracks: Array<AudioInfo>;

  @Input() isUsers: boolean;

  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };

  constructor(private trackListService: TrackListService,
    private soundcloudService: SoundcloudService) {
  }

  ngOnInit() {
    this.refreshTracks();
  }

  public refreshTracks() {
    if (!this.tracks) return;
    this.trackListService.tracks = [];
    this.tracks.forEach(audio => {
      var trackId = audio.id;
      this.soundcloudService.getTrack(trackId).subscribe(track => {
        if(this.soundcloudService.playingTrack && track.id == this.soundcloudService.playingTrack.id){
          track.isPlaying = true;
        }
        track.isAdded = true;
        track.saveDate = audio.date;
        this.trackListService.tracks.push(track);

        if(this.tracks.length == this.trackListService.tracks.length){
          this.trackListService.tracks = this.trackListService.mixPlaylist(false, this.trackListService.tracks);
        }
      })
    });
  }

  public removeFromPlaylist(track) {
    this.trackListService.removeTrack(track);
  }

}
