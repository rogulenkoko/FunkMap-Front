import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { ConfigurationProvider } from 'app/core/configuration/configuration-provider';
import { Track } from 'app/tools/soundcloud/track';

@Injectable()
export class SoundcloudService {

  constructor(private http: Http) { }


  public search(text: string): Observable<Array<Track>>{
    return this.http.get(`${ConfigurationProvider.soundcloudApi}tracks?linked_partitioning=1&client_id=${ConfigurationProvider.soundcloudKey}&q=${text}`)
      .map(x=>Track.toTracks(x.json().collection));
  }

  public getTrack(id: number): Observable<Track>{
    return this.http.get(`${ConfigurationProvider.soundcloudApi}tracks/${id}?client_id=${ConfigurationProvider.soundcloudKey}`)
    .map(x=>Track.toTrack(x.json()));
  }



}
