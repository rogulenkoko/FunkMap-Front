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


  public tracks: Array<Track>;

  public search: string;

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

  public refreshTracks() {
    if(!this.search){
      this.tracks = [];
      return;
    }

    this.soundcloudService.search(this.search).subscribe(tracks => {
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

}
