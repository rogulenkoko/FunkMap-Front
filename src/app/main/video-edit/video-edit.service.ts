import { Injectable, EventEmitter } from '@angular/core';
import { VideoInfo } from "app/main/video-edit/video-info";
import { HttpClient } from "app/core/http/http-client.service";
import { BaseModel, ConfigurationProvider } from "app/core";
import { Observable } from "rxjs/Observable";
import { BaseResponse } from "app/tools";
import { ServiceType } from "app/core/configuration/configuration-provider";

@Injectable()
export class VideoEditService {

  public onVideoSaved: EventEmitter<VideoInfo>= new EventEmitter<VideoInfo>();

  constructor() {
    this.onVideoSaved = new EventEmitter<VideoInfo>();
  }

}
