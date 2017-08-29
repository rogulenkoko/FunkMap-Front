import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseModel } from "app/core";
import { UserDataService } from "app/main/user/user-data.service";
import { UserService } from "app/main/user/user.service";
import { FavouritesService } from "app/main/favourites/favourites.service";
import { EditableCard } from "app/tools/entity-full/editable-card";
import { EditService } from "app/tools/entity-full/edit.service";
import { InfoItem } from "app/tools/entity-full/entity-info/entity-info.component";
import { Router } from "@angular/router";
import { AvatarService } from "app/main/avatar/avatar.service";
import { Subscription } from "rxjs/Subscription";
import { RouteBuilder } from "app/tools/route-builder";
import { AvatarBaseService } from "app/main/avatar/avatar-base.service";
import { SaveImageRequest } from "app/main/user/save-image-request";

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

  @Output() onAvatarLoaded: EventEmitter<string>;

  private avatarSubscription: Subscription;
  private canEditPhoto: boolean;

  constructor(userService: UserService,
              userDataService: UserDataService,
              editService: EditService,
              private favouritesService: FavouritesService,
              private router: Router,
              private avatarService: AvatarService,
              private avatarBaseService: AvatarBaseService) {
    super(userService, userDataService, editService);
    this.onAvatarLoaded = new EventEmitter<string>();
    this.avatarService.onClosed.subscribe(()=> this.onAvatarClosed());
    
  }

  ngOnInit() {
    
    this.checkIsUserEntity(this.entity.login);
    this.checkIsFavorite();
  }

  private checkIsFavorite() {
    if(!this.userService.user) return;
    this.favouritesService.getFavouritesLogins().subscribe(favorites => {
      if (favorites.find(x => x == this.entity.login)) {
        this.isFavorite = true;
      } else {
        this.isFavorite = false;
      }
    });
  }

  private addToFavorites() {
    this.favouritesService.setFavourite(this.entity.login).subscribe(response => {
      if (response.success) {
        this.isFavorite = !this.isFavorite;
      }
    })
  }

  private changeUserAvatar(){
    this.avatarService.previousImage = this.entity.avatar;
    this.avatarSubscription = this.avatarService.onImageUploaded.subscribe(avatar=> this.onAvatarSaved(avatar));
    this.isEditMode = false;
    this.router.navigate(['/avatar']);
  }

  private onAvatarSaved(image: string){
      this.avatarSubscription.unsubscribe();
      this.avatarService.previousImage = undefined;
      var request = new SaveImageRequest(this.entity.login, image);
      this.avatarBaseService.updateAvatar(request).subscribe(response=>{
        var route = RouteBuilder.buildRoute(this.entity.entityType, this.entity.login);
        this.router.navigate([route]);
      });
  }

  protected changeAvatarEditVisible(choice: number) {
      if (!this.isUsers) return;
      if (choice > 0) this.canEditPhoto = true;
      else this.canEditPhoto = false;
  }

  private onAvatarClosed(){
    if(this.avatarSubscription) this.avatarSubscription.unsubscribe();
  }

}
