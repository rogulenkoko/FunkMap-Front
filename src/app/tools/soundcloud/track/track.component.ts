import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Track } from 'app/tools/soundcloud/track';

@Component({
  selector: 'soundcloud-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  @Input() track: Track;

  @Output() onPlay: EventEmitter<Track>;
  @Output() onPause: EventEmitter<Track>;
  @Output() onAdded: EventEmitter<Track>;
  @Output() onRemoved: EventEmitter<Track>;

  constructor() {
    this.onPlay = new EventEmitter<Track>();
    this.onPause = new EventEmitter<Track>();
    this.onAdded = new EventEmitter<Track>();
    this.onRemoved = new EventEmitter<Track>();
   }

  ngOnInit() {
   
  }


  public play(track: Track){
    this.onPlay.emit(track);
  }

  public stop(track: Track){
    this.onPause.emit(track);
  }

  public addToPlaylist(track: Track){
    this.onAdded.emit(track);
  }

  public removeFromPlaylist(track: Track){
    this.onRemoved.emit(track);
  }

}
