import { Component, OnInit } from '@angular/core';
import { TrackListService } from 'app/tools/soundcloud/track-list.service';
import { SoundcloudService } from 'app/tools/soundcloud/soundcloud.service';
import { Track } from 'app/tools/soundcloud/track';

@Component({
  selector: 'soundcloud-player-mini',
  templateUrl: './soundcloud-player-mini.component.html',
  styleUrls: ['./soundcloud-player-mini.component.scss']
})
export class SoundcloudPlayerMiniComponent implements OnInit {

  public playerVisible: boolean = false;

  constructor(public trackListService: TrackListService,
              private soundcloudService: SoundcloudService) { }

  ngOnInit() {
  }

  play(track: Track){
    this.trackListService.play(track);
  }

  stop(track: Track){
    this.trackListService.stop(track);
  }

  next(track: Track){
    this.trackListService.playNext(track);
  }

  prev(track: Track){
    this.trackListService.playPrev(track);
  }

  showPlayer(forceClose?:boolean){
    if(forceClose){
      this.playerVisible = false;
      return;  
    }
    this.playerVisible = !this.playerVisible;
  }

}
