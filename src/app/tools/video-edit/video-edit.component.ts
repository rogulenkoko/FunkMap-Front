import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';

import { Router } from "@angular/router";
import { VideoType, VideoInfo } from 'app/tools/video-edit/video-info';
import { VideoApiService } from 'app/tools/video-edit/video-api.service';
import { Dialog } from 'primeng/primeng';

@Component({
  selector: 'video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.scss']
})
export class VideoEditComponent implements OnInit {

  public videoLink: string;
  public videoId: string;

  private videoType: VideoType;

  public videoInfo: VideoInfo;

  public isLinkInvalid: boolean = false;

  @ViewChild("videoEditModal") videoEditModal: Dialog;

  private _isAddVideoMode: boolean;
  @Input() get isAddVideoMode(): boolean{
    return this._isAddVideoMode;
  }

  set isAddVideoMode(value: boolean){
    this._isAddVideoMode = value;
  }

  @Output() isAddVideoModeChange: EventEmitter<boolean>;



  @Output() onVideoSaved: EventEmitter<VideoInfo>;

  constructor(private videoApiService: VideoApiService,
              private router: Router) {
    this.onVideoSaved = new EventEmitter<VideoInfo>();
    this.isAddVideoModeChange = new EventEmitter<boolean>();
  }

  ngOnInit() {
   
  }

  public onLinkChanged() {
    
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
      setTimeout(()=>{
        this.videoInfo = info;
        this.videoEditModal.show();
      },10)
      
    })
  }

  public save(){
    this.onVideoSaved.emit(this.videoInfo);
    this.clear();
  }

  private getParameterByName(name: string, source: string) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(source);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  public onClosed(){
    this.clear();
  }

  private clear(){
    this.videoInfo = undefined;
    this.isAddVideoMode = false;
    this.isAddVideoModeChange.emit(this.isAddVideoMode);
    this.videoLink = "";
  }

}