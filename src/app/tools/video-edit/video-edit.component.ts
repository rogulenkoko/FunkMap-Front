import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Router } from "@angular/router";
import { VideoType, VideoInfo } from 'app/tools/video-edit/video-info';
import { VideoApiService } from 'app/tools/video-edit/video-api.service';

@Component({
  selector: 'video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.scss']
})
export class VideoEditComponent implements OnInit {

  private videoLink: string;
  private videoId: string;

  private videoType: VideoType;

  private videoInfo: VideoInfo;

  private isLinkInvalid: boolean = false;


  private _isAddVideoMode: boolean = true;
  @Input() get isAddVideoMode(): boolean{
    return this._isAddVideoMode;
  }

  set isAddVideoMode(value: boolean){
    this._isAddVideoMode = value;
  }

  @Output() visibleChange: EventEmitter<boolean>;



  @Output() onVideoSaved: EventEmitter<VideoInfo>;

  constructor(private videoApiService: VideoApiService,
              private router: Router) {
    this.onVideoSaved = new EventEmitter<VideoInfo>();
    this.visibleChange = new EventEmitter<boolean>();
  }

  ngOnInit() {
   
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
      if(info) this.isAddVideoMode = false;
      setTimeout(()=>{
        this.videoInfo = info;
        this.isAddVideoMode = true;
      },10)
      
    })
  }

  private save(){
    this.onVideoSaved.emit(this.videoInfo);
  }

  private getParameterByName(name: string, source: string) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(source);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  private onClosed(){
    this.videoInfo = undefined;
    this.visibleChange.emit(this.isAddVideoMode);
  }

}