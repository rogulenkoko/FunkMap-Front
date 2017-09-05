import { Component, OnInit } from '@angular/core';
import { VideoApiService } from "app/main/video-edit/video-api.service";
import { VideoEditService } from "app/main/video-edit/video-edit.service";
import { VideoType, VideoInfo } from "app/main/video-edit/video-info";

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.scss']
})
export class VideoEditComponent implements OnInit {

  private videoLink: string;
  private videoId: string;

  private videoType: VideoType;

  private videoInfo: VideoInfo;

  private isLinkInvalid: boolean = false;

  constructor(private videoApiService: VideoApiService,
              private videoEditService: VideoEditService) { }

  ngOnInit() {
    // this.videoLink = "https://vimeo.com/35700803";
    // this.onLinkChanged();
  }

  private onLinkChanged() {
    
    if ((!this.videoLink.includes("www.youtube.com") || !this.videoLink.includes("v=")) && !this.videoLink.includes("vimeo.com")) {
      this.isLinkInvalid = true;
      setTimeout(() => this.isLinkInvalid = false, 2000);
      this.videoInfo = undefined;
      return;
    }

    var type: VideoType;
    var videoId: string;
    if(this.videoLink.includes("youtube")){
      type = VideoType.Youtube;
      videoId = this.getParameterByName("v", this.videoLink);

    } else {
      type = VideoType.Vimeo;
      videoId = this.videoLink.split('/')[this.videoLink.split('/').length - 1];
    }
    this.videoApiService.getVideoInfo(videoId, type).subscribe(info=>{
      this.videoInfo = info;
    })
  }

  private getParameterByName(name: string, source: string) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(source);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

}