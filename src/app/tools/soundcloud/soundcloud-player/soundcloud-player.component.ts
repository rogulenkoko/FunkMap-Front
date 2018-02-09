import { Component, OnInit, Input } from '@angular/core';
import { Track } from 'app/tools/soundcloud/track';
import { TrackListService } from 'app/tools/soundcloud/track-list.service';

@Component({
  selector: 'soundcloud-player',
  templateUrl: './soundcloud-player.component.html',
  styleUrls: ['./soundcloud-player.component.scss']
})
export class SoundcloudPlayerComponent implements OnInit {


  public volume: number;

  constructor(private trackListService: TrackListService) { }

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

  volumeChange(value: number){
    console.log(value);
  }

}
