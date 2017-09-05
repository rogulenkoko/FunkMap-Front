import { Injectable, EventEmitter } from '@angular/core';
import { VideoInfo } from "app/main/video-edit/video-info";

@Injectable()
export class VideoEditService {

  public onVideoSaved: EventEmitter<VideoInfo>;

  constructor() {
    this.onVideoSaved = new EventEmitter<VideoInfo>();
   }

}
