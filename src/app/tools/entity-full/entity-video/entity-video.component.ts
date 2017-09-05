import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from "app/core";
import { EditableCard } from "app/tools/entity-full/editable-card";
import { UserDataService } from "app/main/user/user-data.service";
import { EditService } from "app/tools/entity-full/edit.service";
import { UserService } from "app/main/user/user.service";
import { VideoEditService } from "app/main/video-edit/video-edit.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { VideoInfo } from "app/main/video-edit/video-info";
import { RouteBuilder } from "app/tools/route-builder";

@Component({
  selector: 'entity-video',
  templateUrl: './entity-video.component.html',
  styleUrls: ['./entity-video.component.scss']
})
export class EntityVideoComponent extends EditableCard implements OnInit {

  @Input() entity: BaseModel;

  private subscription: Subscription;

  constructor(userService: UserService,
              userDataService: UserDataService,
              editService: EditService,
              private videoEditService: VideoEditService,
              private router: Router) {
    super(userService, userDataService, editService);
    this.subscription = new Subscription();
  }

  ngOnInit() {
     this.checkIsUserEntity(this.entity.login);
     this.isEditVisible = true;
  }

  private editVideo(){
    this.subscription.add(this.videoEditService.onVideoSaved.subscribe(info=>this.saveVideo(info)));
    
    this.router.navigate(['/video']);
  }

  private saveVideo(info: VideoInfo){
    console.log(info);
    var route = RouteBuilder.buildRoute(this.entity.entityType, this.entity.login);
    this.router.navigate([route]);
    this.subscription.unsubscribe();
  }

}
