import { Component, OnInit, Input } from '@angular/core';
import { Track } from 'app/tools/soundcloud/track';
import { TrackListService } from 'app/tools/soundcloud/track-list.service';
import { SoundcloudService } from 'app/tools/soundcloud/soundcloud.service';
import * as moment from "moment";

@Component({
  selector: 'soundcloud-player',
  templateUrl: './soundcloud-player.component.html',
  styleUrls: ['./soundcloud-player.component.scss']
})
export class SoundcloudPlayerComponent implements OnInit {


  private durationPercent: number = 0;
  private currentDuration: string = "00:00";

  constructor(public trackListService: TrackListService,
              private soundcloudService: SoundcloudService) { }

  ngOnInit() {
    this.soundcloudService.onTimeChanged.subscribe(miliseconds=> this.onTimeChanged(miliseconds));
  }

  play(track: Track) {
    this.trackListService.play(track);
  }

  stop(track: Track) {
    this.trackListService.stop(track);
  }

  next(track: Track) {
    this.trackListService.playNext(track);
  }

  prev(track: Track) {
    this.trackListService.playPrev(track);
  }

  volumeChange(value: any) {
    this.trackListService.settings.volume = value.value;
    this.trackListService.refreshSettings();
  }

  mute() {
    this.trackListService.settings.mute = !this.trackListService.settings.mute;
    this.trackListService.refreshSettings();
  }

  repeat() {
    this.trackListService.settings.repeat = !this.trackListService.settings.repeat;
    this.trackListService.refreshSettings();
  }

  mix() {
    this.trackListService.settings.mix = !this.trackListService.settings.mix;
    this.trackListService.refreshSettings();
  }

  onTimeChanged(miliseconds: number){
    this.durationPercent = ((miliseconds/1000) / this.trackListService.lastTrack.durationS) * 100;
    this.currentDuration = moment(miliseconds).format("mm:ss");
  }

  timeChanged($event){
    var percent = $event.value;
    var time = (this.trackListService.lastTrack.durationS * 1000 * percent) / 100;
    this.soundcloudService.setTime(time);
  }

}
