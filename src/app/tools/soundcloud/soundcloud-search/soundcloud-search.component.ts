import { Component, OnInit, OnDestroy } from '@angular/core';
import { SoundcloudService } from 'app/tools/soundcloud/soundcloud.service';
import { Track } from 'app/tools/soundcloud/track';
import { TrackListService } from 'app/tools/soundcloud/track-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'soundcloud-search',
  templateUrl: './soundcloud-search.component.html',
  styleUrls: ['./soundcloud-search.component.scss']
})
export class SoundcloudSearchComponent implements OnInit, OnDestroy {


  private tracks: Array<Track>;

  private search: string = "rakei";

  private subscription: Subscription;

  constructor(private soundcloudService: SoundcloudService,
              private trackListService: TrackListService) {
      this.subscription = new Subscription();
      this.subscription.add(this.trackListService.onTrackAdded.subscribe(id=> this.refreshTracksCondition()));
      this.subscription.add(this.trackListService.onTrackDeleted.subscribe(id=> this.refreshTracksCondition()));
   }

  ngOnInit() {
    this.refreshTracks();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private refreshTracks() {
    if(!this.search){
      this.tracks = [];
      return;
    }

    this.soundcloudService.search(this.search).subscribe(tracks => {
      tracks.forEach(track => {
        track.frameUrl = this.getPlayerFrameUrl(track.id);
      });
      
      this.tracks = tracks;
      this.refreshTracksCondition();
      
    })
  }

  private addToPlaylist(track: Track){
    this.trackListService.addTrack(track);
  }

  private removeFromPlaylist(track: Track){
    this.trackListService.removeTrack(track);
  }

  private refreshTracksCondition(){
    this.tracks.forEach(track=>{
      track.isAdded = this.trackListService.tracks.find(x=>x.id == track.id) ? true : false;
    });
  }


  private getPlayerFrameUrl(id): string {
    return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}?buying=false&sharing=false&single_active=true`;
  }

}
