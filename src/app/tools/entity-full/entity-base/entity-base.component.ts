import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from "app/core";
import { UserDataService } from "app/main/user/user-data.service";
import { UserService } from "app/main/user/user.service";
import { FavouritesService } from "app/main/favourites/favourites.service";
import { EditableCard } from "app/tools/entity-full/editable-card";
import { EditService } from "app/tools/entity-full/edit.service";
import { InfoItem } from "app/tools/entity-full/entity-info/entity-info.component";

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

  constructor(userService: UserService,
              userDataService: UserDataService,
              editService: EditService,
              private favouritesService: FavouritesService) {
    super(userService, userDataService, editService);
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

}
