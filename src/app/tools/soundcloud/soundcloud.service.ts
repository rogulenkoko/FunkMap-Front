import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { ConfigurationProvider } from 'app/core/configuration/configuration-provider';
import { Track } from 'app/tools/soundcloud/track';

declare var SC;

@Injectable()
export class SoundcloudService {

  constructor(private http: Http) {
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
  public playingTrackUrl: string;

  public play(url: string){
    SC.stream(url.replace("https://api.soundcloud.com/", "")).then((player)=>{
      this.player = player;
      player.play();
      this.playingTrackUrl = url;
    });
  }

  public stop(){
    if(this.player){
      this.player.kill();
      this.playingTrackUrl = undefined;
    }
  }



}
