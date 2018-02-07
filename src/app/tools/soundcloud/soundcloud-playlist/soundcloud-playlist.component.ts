import { Component, OnInit, Input } from '@angular/core';
import { TrackListService } from 'app/tools/soundcloud/track-list.service';
import { Track } from 'app/tools/soundcloud/track';
import { SoundcloudService } from 'app/tools/soundcloud/soundcloud.service';

@Component({
  selector: 'soundcloud-playlist',
  templateUrl: './soundcloud-playlist.component.html',
  styleUrls: ['./soundcloud-playlist.component.scss']
})
export class SoundcloudPlaylistComponent implements OnInit {

  @Input() trackIds: Array<number>;

  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };

  constructor(private trackListService: TrackListService,
    private soundcloudService: SoundcloudService) {
  }

  ngOnInit() {
    this.refreshTracks();
  }

  public refreshTracks() {
    if (!this.trackIds) return;
    this.trackListService.tracks = [];
    this.trackIds.forEach(trackId => {
      this.soundcloudService.getTrack(trackId).subscribe(track => {
        if(this.soundcloudService.playingTrackUrl && track.uri.includes(this.soundcloudService.playingTrackUrl)){
          track.isPlaying = true;
        }
        track.isAdded = true;
        this.trackListService.tracks.push(track);
      })
    });
  }

  private play(track: Track){
    var playing = this.trackListService.tracks.find(x=>x.isPlaying);

    if(playing){
      this.stop(playing);
    }

    track.isPlaying = true;

    this.soundcloudService.play(track.uri);
  }

  private stop(track: Track){
    track.isPlaying = false;

    this.soundcloudService.stop();
  }

  public removeFromPlaylist(track) {
    this.trackListService.removeTrack(track);
  }

}
