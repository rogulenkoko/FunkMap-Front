import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from 'app/core';
import { BaseEditService } from 'app/tools/entity-full/base-edit.service';
import { EditableCard } from 'app/tools/entity-full/editable-card';
import { UserService } from 'app/main/user/user.service';
import { UserDataService } from 'app/main/user/user-data.service';
import { EditService } from 'app/tools/entity-full/edit.service';

@Component({
  selector: 'entity-active',
  templateUrl: './entity-active.component.html',
  styleUrls: ['./entity-active.component.scss']
})
export class EntityActiveComponent extends EditableCard implements OnInit {

  private isNotActive: boolean;

  @Input() entity: BaseModel;

  constructor(private baseEditService: BaseEditService,
              userService: UserService,
              userDataService: UserDataService,
              editService: EditService) {
    super(userService, userDataService, editService);
   }

  ngOnInit() {
    this.isNotActive = !this.entity.isActive;
    this.checkIsUserEntity(this.entity.login);
  }

  changeActivity(activity: boolean){
    var base = new BaseModel();
    base.isActive = activity;
    base.entityType = this.entity.entityType;
    base.login = this.entity.login;
    this.baseEditService.update(base).subscribe(response=>{

    });
  }

}
