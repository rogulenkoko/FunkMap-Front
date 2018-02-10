import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { ConfigurationProvider } from 'app/core/configuration/configuration-provider';
import { Track } from 'app/tools/soundcloud/track';

declare var SC;

@Injectable()
export class SoundcloudService {


  public onFinished: EventEmitter<Track>;
  public onTimeChanged: EventEmitter<number>;

  constructor(private http: Http) {
    this.onFinished = new EventEmitter<Track>();
    this.onTimeChanged = new EventEmitter<number>();

    SC.initialize({
      client_id: ConfigurationProvider.soundcloudKey
    });
  }


  public search(text: string): Observable<Array<Track>> {
    return this.http.get(`${ConfigurationProvider.soundcloudApi}tracks?linked_partitioning=1&client_id=${ConfigurationProvider.soundcloudKey}&q=${text}`)
      .map(x => Track.toTracks(x.json().collection));
  }

  public getTrack(id: number): Observable<Track> {
    return this.http.get(`${ConfigurationProvider.soundcloudApi}tracks/${id}?client_id=${ConfigurationProvider.soundcloudKey}`)
      .map(x => Track.toTrack(x.json()));
  }

  private player;
  public playingTrack: Track;

  public play(track: Track, volume: number){

    if(this.playingTrack && track.id == this.playingTrack.id && this.player && this.player.getState() == "paused"){
      this.player.play();
      return;
    }

    SC.stream(track.url.replace("https://api.soundcloud.com/", "")).then((player)=>{
      if(this.player) this.player.kill();
      this.player = player;
      this.player.setVolume(volume/100);
      player.play();
      var that = this;
      this.playingTrack = track;
      player.on("finish", ()=> that.onFinished.emit(track));
      player.on("time", (event)=> that.onTimeChanged.emit(event));
    });
  }

  public stop(){
    if(this.player){
      this.player.pause();
    }
  }

  public updateVolume(volume: number){
    if(!this.player) return;

    this.player.setVolume(volume/100);
  }

  public setTime(timeMs: number){
    if(this.player){
      this.player.seek(timeMs);
    }
  }

}
