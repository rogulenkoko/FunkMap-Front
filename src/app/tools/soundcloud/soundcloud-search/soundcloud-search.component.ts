import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
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

  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };

  public tracks: Array<Track>;


  private searchText: string;

  @Input() isUsers: boolean;

  @Input() get search(): string {
    return this.searchText;
  }

  set search(value: string) {
    this.searchText = value;
    this.searchChange.emit(this.searchText);
  }

  @Output() searchChange: EventEmitter<string>;

  private subscription: Subscription;

  constructor(private soundcloudService: SoundcloudService,
              private trackListService: TrackListService) {
      this.subscription = new Subscription();
      this.searchChange = new EventEmitter<string>();
      this.subscription.add(this.trackListService.onTrackAdded.subscribe(id=> this.refreshTracksCondition()));
      this.subscription.add(this.trackListService.onTrackDeleted.subscribe(id=> this.refreshTracksCondition()));
      this.subscription.add(this.searchChange.subscribe(search=>this.refreshTracks()))
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
      this.tracks = this.trackListService.mixPlaylist(false, tracks);
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

  private play(track: Track){
    var playing = this.trackListService.tracks.find(x=>x.isPlaying);

    if(playing){
      this.stop(playing);
    }

    track.isPlaying = true;

    this.trackListService.tracks = this.tracks;
    this.trackListService.play(track);
  }

  private stop(track: Track){
    track.isPlaying = false;

    this.trackListService.stop(track);
  }

}
