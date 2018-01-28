import { Component, OnInit } from '@angular/core';
import { TrackListService } from 'app/tools/soundcloud/track-list.service';
import { Track } from 'app/tools/soundcloud/track';

@Component({
  selector: 'soundcloud-playlist',
  templateUrl: './soundcloud-playlist.component.html',
  styleUrls: ['./soundcloud-playlist.component.scss']
})
export class SoundcloudPlaylistComponent implements OnInit {

  public tracks: Array<Track>;

  constructor(private trackListService: TrackListService) {
    this.trackListService.onTrackAdded.subscribe(()=> this.refresh());
    this.trackListService.onTrackDeleted.subscribe(()=> this.refresh());
   }

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.tracks = this.trackListService.tracks;
  }

  public getPlayerFrameUrl(id): string {
    return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}?buying=false&sharing=false&single_active=true`;
  }

  public removeFromPlaylist(track){
    this.trackListService.removeTrack(track);
  }

}
