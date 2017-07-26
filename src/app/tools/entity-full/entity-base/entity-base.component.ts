import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from "app/core";
import { UserDataService } from "app/main/user/user-data.service";
import { UserService } from "app/main/user/user.service";
import { FavouritesService } from "app/main/favourites/favourites.service";

@Component({
  selector: 'entity-base',
  templateUrl: './entity-base.component.html',
  styleUrls: ['./entity-base.component.scss']
})
export class EntityBaseComponent implements OnInit {

  @Input() entity: BaseModel;
  private isFavorite: boolean;
  private isUsers: boolean;

  @Input() underNameTemplate: any;

  constructor(private userService: UserService,
              private userDataService: UserDataService,
              private favouritesService: FavouritesService) { }

  ngOnInit() {
    this.checkIsUserEntity();
    this.checkIsFavorite();
  }

  private checkIsUserEntity() {
    if(!this.userService.user) return;
    this.userDataService.getUserEntitiesLogins().subscribe(logins => {
      this.isUsers = logins.find(x => x == this.entity.login) ? true : false;
    });
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
