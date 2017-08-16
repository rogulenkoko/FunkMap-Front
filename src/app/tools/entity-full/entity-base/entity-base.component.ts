import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from "app/core";
import { UserDataService } from "app/main/user/user-data.service";
import { UserService } from "app/main/user/user.service";
import { FavouritesService } from "app/main/favourites/favourites.service";
import { EditableCard } from "app/tools/entity-full/editable-card";

@Component({
  selector: 'entity-base',
  templateUrl: './entity-base.component.html',
  styleUrls: ['./entity-base.component.scss']
})
export class EntityBaseComponent extends EditableCard implements OnInit {

  @Input() entity: BaseModel;
  private isFavorite: boolean;

  @Input() underNameTemplate: any;

  constructor(userService: UserService,
              userDataService: UserDataService,
              private favouritesService: FavouritesService) {
    super(userService, userDataService);
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
