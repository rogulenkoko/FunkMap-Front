import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SoundcloudService } from 'app/tools/soundcloud/soundcloud.service';
import { Track } from 'app/tools/soundcloud/track';

@Component({
  selector: 'soundcloud-search',
  templateUrl: './soundcloud-search.component.html',
  styleUrls: ['./soundcloud-search.component.scss']
})
export class SoundcloudSearchComponent implements OnInit {


  private tracks: Array<Track>;

  private search: string = "rakei";


  @Input() trackIds: Array<number>;

  @Output() onAddedToPlaylist: EventEmitter<number>;

  constructor(private soundcloudService: SoundcloudService) {
    this.onAddedToPlaylist = new EventEmitter<number>();
   }

  ngOnInit() {
    this.refreshTracks();
  }

  private refreshTracks() {
    if(!this.search){
      this.tracks = [];
      return;
    }

    this.soundcloudService.search(this.search).subscribe(tracks => {

      tracks.forEach(track => {
        track.frameUrl = this.getPlayerFrameUrl(track.id);

        if(this.trackIds){
          track.isAdded = this.trackIds.find(x=>x == track.id) ? true : false;
        }
        
      });

      this.tracks = tracks;
      
    })
  }

  private addToPlaylist(id: number){
    var track = this.tracks.find(x=>x.id == id);
    track.isAdded = true;
    this.onAddedToPlaylist.emit(id);
  }


  private getPlayerFrameUrl(id): string {
    return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}?buying=false&sharing=false&single_active=true`;
  }

}
