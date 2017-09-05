import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { VideoInfo, VideoType } from "app/main/video-edit/video-info";

@Injectable()
export class VideoApiService {

  constructor(private http: Http) { }


  getVideoInfo(videoId: string, videoType: VideoType): Observable<any>{

    switch (videoType){
      case VideoType.Youtube:
       return this.http.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=AIzaSyBAe2vqNwz-pbrU2cp1nCWiz1yOAozPfps`).map(x=>VideoInfo.ConvertYoutube(x.json()));
      case VideoType.Vimeo:
      return this.http.get(`http://vimeo.com/api/v2/video/${videoId}.json`).map(x=> VideoInfo.ConvertVimeo(x.json()));
    }
  }

}


