import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from "app/core";
import { EditableCard } from "app/tools/entity-full/editable-card";
import { UserDataService } from "app/main/user/user-data.service";
import { EditService } from "app/tools/entity-full/edit.service";
import { UserService } from "app/main/user/user.service";

@Component({
  selector: 'entity-video',
  templateUrl: './entity-video.component.html',
  styleUrls: ['./entity-video.component.scss']
})
export class EntityVideoComponent extends EditableCard implements OnInit {

  @Input() entity: BaseModel;

  constructor(userService: UserService,
              userDataService: UserDataService,
              editService: EditService) {
    super(userService, userDataService, editService);
  }

  ngOnInit() {
     this.checkIsUserEntity(this.entity.login);
  }

}
