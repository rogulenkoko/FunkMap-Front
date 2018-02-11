import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { BaseModel } from "app/core";
import { EditableCard } from "app/tools/entity-full/editable-card";
import { UserDataService } from "app/main/user/user-data.service";
import { EditService } from "app/tools/entity-full/edit.service";
import { UserService } from "app/main/user/user.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { RouteBuilder } from "app/tools/route-builder";
import { BaseEditService } from "app/tools/entity-full/base-edit.service";
import { VideoInfo } from 'app/tools/video-edit/video-info';
import { AdaptiveService } from 'app/tools/adaptive.service';

@Component({
  selector: 'entity-video',
  templateUrl: './entity-video.component.html',
  styleUrls: ['./entity-video.component.scss']
})
export class EntityVideoComponent extends EditableCard implements OnInit, AfterViewInit {

  @Input() entity: BaseModel;

  public config: any;
  index: number = 0;

  public isAddVideoMode: boolean = false;


  public playerWidth: number;
  public playerHeight: number;

  constructor(private editBaseService: BaseEditService,
    private router: Router,
    private editService: EditService,
    private adaptiveService: AdaptiveService) {
    super();


  }

  ngOnInit() {
    

    this.isUsers = this.editService.isUsers;
    var config:any = {
      direction: 'horizontal',
      slidesPerView: 'auto',
      paginationClickable: true
    };

    if (this.entity.videoInfos && this.entity.videoInfos.length > 2) {
      config.pagination = '.swiper-pagination';
    }

    this.config = config;
  }

  ngAfterViewInit(){
    if (this.adaptiveService.isMobile()) {
      var containerWidth:number = jQuery("#mobile-container").width();
      console.log(containerWidth);
      this.playerHeight = containerWidth / 1.6;
      this.playerWidth = containerWidth;
      console.log(this.playerWidth);
      console.log(this.playerHeight);
      this.isEditVisible = false;
    } else {
      this.playerHeight = 200;
      this.playerWidth = 350;
      this.isEditVisible = true;
    }
  }

  private editVideo() {
    this.isAddVideoMode = false;
    this.isAddVideoMode = true;
  }

  private saveVideo(info: VideoInfo) {
    var request = new BaseModel(this.entity.login, this.entity.name, this.entity.entityType);
    if (!this.entity.videoInfos) {
      this.entity.videoInfos = [];
    }
    this.entity.videoInfos.push(info);
    request.videoInfos = this.entity.videoInfos;
    this.editBaseService.update(request).subscribe(response => {
      if (response.success) {

      }
    });
  }

  private onVideoEditClosed() {

  }
}
