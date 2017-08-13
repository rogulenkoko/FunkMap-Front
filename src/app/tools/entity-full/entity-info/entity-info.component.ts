import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from "app/main/user/user.service";
import { UserDataService } from "app/main/user/user-data.service";
import { BaseModel } from "app/core";
import { EditableCard } from "app/tools/entity-full/editable-card";

@Component({
  selector: 'entity-info',
  templateUrl: './entity-info.component.html',
  styleUrls: ['./entity-info.component.scss']
})
export class EntityInfoComponent extends EditableCard implements OnInit {

  @Input() entity: BaseModel;
  @Input() items: Array<InfoItem>;
  
  constructor(private userService: UserService,
              private userDataService: UserDataService) {
    super();
  }

  ngOnInit() {
    this.checkIsUserEntity();
  }

  private checkIsUserEntity() {
    if(!this.userService.user) return;
    this.userDataService.getUserEntitiesLogins().subscribe(logins => {
      this.isUsers = logins.find(x => x == this.entity.login) ? true : false;
    });
  }
}

export class InfoItem{
  public propertyTitle: string;
  public propertyValue: string;
  public propertyTemplate: any;

  public propertyEditTemplate: any;
}
