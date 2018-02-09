import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { ConfigurationProvider } from 'app/core/configuration/configuration-provider';
import { Track } from 'app/tools/soundcloud/track';

declare var SC;

@Injectable()
export class SoundcloudService {


  public onFinished: EventEmitter<Track>;

  constructor(private http: Http) {
    this.onFinished = new EventEmitter<Track>();

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

  public play(track: Track){
    SC.stream(track.url.replace("https://api.soundcloud.com/", "")).then((player)=>{
      this.player = player;
      //player.play();
      var that = this;
      this.playingTrack = track;
      player.on("finish", ()=> that.onFinished.emit(track));
    });
  }

  public stop(){
    if(this.player){
      this.player.kill();
      this.playingTrack = undefined;
    }
  }



}
