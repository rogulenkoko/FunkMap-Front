import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from "app/main/user/user.service";
import { UserDataService } from "app/main/user/user-data.service";
import { BaseModel } from "app/core";
import { EditableCard } from "app/tools/entity-full/editable-card";
import { EditService } from "app/tools/entity-full/edit.service";

@Component({
  selector: 'entity-info',
  templateUrl: './entity-info.component.html',
  styleUrls: ['./entity-info.component.scss']
})
export class EntityInfoComponent extends EditableCard implements OnInit {

  private entity: BaseModel;
  @Input() items: Array<InfoItem>;
  
  constructor(userService: UserService,
              userDataService: UserDataService,
             editService: EditService) {
    super(userService, userDataService, editService);
    this.entity = this.editService.baseModel;
  }

  ngOnInit() {
    this.checkIsUserEntity(this.entity.login);
  }
}

export class InfoItem{
  public propertyTitle: string;
  public propertyValue: string;
  public propertyTemplate: any;

  public propertyEditTemplate: any;
}
