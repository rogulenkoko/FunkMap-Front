import { Component, OnInit, Input } from '@angular/core';
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

@Component({
  selector: 'entity-video',
  templateUrl: './entity-video.component.html',
  styleUrls: ['./entity-video.component.scss']
})
export class EntityVideoComponent extends EditableCard implements OnInit {

  @Input() entity: BaseModel;

  private isAddVideoMode: boolean = false;

  constructor(userService: UserService,
              userDataService: UserDataService,
              private editBaseService: BaseEditService,
              private router: Router) {
    super(userService, userDataService);
  }

  ngOnInit() {
    this.checkIsUserEntity(this.entity.login);
    this.isEditVisible = true;
  }

  private editVideo() {
    this.isAddVideoMode = false;
    this.isAddVideoMode = true;
  }

  private saveVideo(info: VideoInfo) {
    var request = new BaseModel(this.entity.login, this.entity.name, this.entity.entityType);
    if(!this.entity.videoInfos){
      this.entity.videoInfos = [];
    }
    this.entity.videoInfos.push(info);
    request.videoInfos = this.entity.videoInfos;
    this.editBaseService.update(request).subscribe(response => {
      if (response.success) {

      }
    });
  }

  private onVideoEditClosed(){
    
  }
}
