import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from "app/main/user/user.service";
import { UserDataService } from "app/main/user/user-data.service";
import { BaseModel } from "app/core";

@Component({
  selector: 'entity-info',
  templateUrl: './entity-info.component.html',
  styleUrls: ['./entity-info.component.scss']
})
export class EntityInfoComponent implements OnInit {


  @Input() entity: BaseModel;
  @Input() items: Array<InfoItem>;
  private isUsers: boolean = false;

  private isEditVisible: boolean = false;
  private isEditMode: boolean = true;


  @Output() onSaved: EventEmitter<any>;
  @Output() onCanceled: EventEmitter<any>;

  constructor(private userService: UserService,
              private userDataService: UserDataService) {
    this.onSaved = new EventEmitter();
    this.onCanceled = new EventEmitter();
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

  private changeEditMode(choice:number){
    if(choice > 0) this.isEditMode = true;
    else this.isEditMode = false;
  }

  private changeEditVisible(choice: number){
    if(!this.isUsers) return;
    if(choice > 0) this.isEditVisible = true;
    else this.isEditVisible = false;
  }

  private save(){
    this.isEditMode = false;
    this.onSaved.emit();
  }

  private cancel(){
    this.isEditMode = false;
    this.onCanceled.emit();
  }

}

export class InfoItem{
  public propertyTitle: string;
  public propertyValue: string;
  public propertyTemplate: any;

  public propertyEditTemplate: any;
}
