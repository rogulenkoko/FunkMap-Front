import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from "app/main/user/user.service";
import { UserDataService } from "app/main/user/user-data.service";
import { BaseModel } from "app/core";
import { EditableCard } from "app/tools/entity-full/editable-card";
import { EditService } from "app/tools/entity-full/edit.service";
import { InfoItem } from 'app/tools/entity-full/info-item';

@Component({
  selector: 'entity-info',
  templateUrl: './entity-info.component.html',
  styleUrls: ['./entity-info.component.scss']
})
export class EntityInfoComponent extends EditableCard implements OnInit {

  public scrollbarOptions = { 
    axis: 'y', 
    theme: 'minimal-dark',
    scrollInertia: 500
  };


  private entity: BaseModel;

  @Input() items: Array<InfoItem>;
  @Input() width: string;
  @Input() height: string;
  
  constructor(private editService: EditService) {
    super();
    this.entity = this.editService.baseModel;
  }

  ngOnInit() {
    this.isUsers = this.editService.isUsers;
  }
}


