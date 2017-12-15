import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseModel } from "app/core";
import { UserDataService } from "app/main/user/user-data.service";
import { UserService } from "app/main/user/user.service";
import { EditableCard } from "app/tools/entity-full/editable-card";
import { EditService } from "app/tools/entity-full/edit.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { RouteBuilder } from "app/tools/route-builder";
import { SaveImageRequest } from "app/main/user/save-image-request";
import { BaseEditService } from "app/tools/entity-full/base-edit.service";
import { InfoItem } from 'app/tools/entity-full/info-item';
import { ActionItem } from 'app/tools/entity-full/action-item';
import { BaseService } from 'app/tools/base.service';

@Component({
  selector: 'entity-base',
  templateUrl: './entity-base.component.html',
  styleUrls: ['./entity-base.component.scss']
})
export class EntityBaseComponent extends EditableCard implements OnInit {

  @Input() entity: BaseModel;
  private isFavorite: boolean;

  @Input() underNameTemplate: any;

  @Input() items: Array<InfoItem>;

  @Input() actionItems: Array<ActionItem>;

  @Output() onAvatarLoaded: EventEmitter<string>;

  private canEditPhoto: boolean;

  private isDeleteMode: boolean = false;
  private changeAvatarMode: boolean = false;

  constructor(private userService: UserService,
              private router: Router,
              private baseEditService: BaseEditService,
              private baseService: BaseService,
              private editService: EditService) {
    super();
    this.onAvatarLoaded = new EventEmitter<string>();
    
  }

  ngOnInit() {
    this.isUsers = this.editService.isUsers;
    this.checkIsFavorite();
  }

  

  private checkIsFavorite() {
    if(!this.userService.user) return;
    this.baseService.getFavouritesLogins().subscribe(favorites => {
      if (favorites.find(x => x == this.entity.login)) {
        this.isFavorite = true;
      } else {
        this.isFavorite = false;
      }
    });
  }

  private addToFavorites() {
    this.isFavorite = !this.isFavorite;
    this.baseService.setFavourite(this.entity.login,  this.isFavorite).subscribe(response => {
      if (response.success) {

      }
    })
  }

  private changeUserAvatar(){
    this.changeAvatarMode = true;
  }

  private onAvatarSaved(image: string){
      this.baseEditService.updateAvatar(this.entity.login, image).subscribe(response=>{
        if(response.success){
          this.entity.avatarId = image ? `data:image/png;base64,${image}` : image;
        }
      });
  }

  protected changeAvatarEditVisible(choice: number) {
      if (!this.isUsers) return;
      if (choice > 0) this.canEditPhoto = true;
      else this.canEditPhoto = false;
  }

  private onAvatarClosed(){
    
  }

  private deleteEntity(){
    this.baseEditService.delete(this.entity.login).subscribe(resp=>{
      if(resp.success) this.router.navigate(['/']);
    });;
  }

  private changeDeleteMode(){
    this.isDeleteMode = !this.isDeleteMode;
  }

}
