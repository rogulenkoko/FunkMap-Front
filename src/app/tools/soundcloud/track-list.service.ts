import { Injectable, EventEmitter } from '@angular/core';
import { Track } from 'app/tools/soundcloud/track';
@Injectable()
export class TrackListService {


  public tracks: Array<Track>;
  public onTrackAdded: EventEmitter<number>;
  public onTrackDeleted: EventEmitter<number>;

  constructor() {
    this.tracks = [];
    this.onTrackAdded = new EventEmitter<number>();
    this.onTrackDeleted = new EventEmitter<number>();
   }


   public addTrack(track: Track){
     this.tracks.push(track);
     this.onTrackAdded.emit(track.id);
   }

   public removeTrack(track: Track){
     this.tracks = this.tracks.filter(x=>x.id != track.id);
     this.onTrackDeleted.emit(track.id);
   }
}
