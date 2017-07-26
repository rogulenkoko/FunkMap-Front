import { Component, OnInit, Input } from '@angular/core';
import { Musician } from "app/main/musician/models";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";
import { FavouritesService } from "app/main/favourites/favourites.service";
import { UserDataService } from "app/main/user/user-data.service";
import { UserService } from "app/main/user/user.service";

@Component({
  selector: 'musician-base',
  templateUrl: './musician-base.component.html',
  styleUrls: ['./musician-base.component.scss']
})
export class MusicianBaseComponent implements OnInit {

  @Input() musician: Musician;
  private isFavorite: boolean;
  private isUsers: boolean;

  constructor(private musicianTypesProvider: MusicianTypesProvider,
              private favouritesService: FavouritesService,
              private userDataService: UserDataService,
              private userService: UserService) { }

  ngOnInit() {
    this.checkIsUserEntity();
    this.checkIsFavorite();

  }

  private checkIsUserEntity() {
    if(!this.userService.user) return;
    this.userDataService.getUserEntitiesLogins().subscribe(logins => {
      this.isUsers = logins.find(x => x == this.musician.login) ? true : false;
    });
  }

  private checkIsFavorite() {
    if(!this.userService.user) return;
    this.favouritesService.getFavouritesLogins().subscribe(favorites => {
      if (favorites.find(x => x == this.musician.login)) {
        this.isFavorite = true;
      } else {
        this.isFavorite = false;
      }
    });
  }

  private addToFavorites() {
    this.favouritesService.setFavourite(this.musician.login).subscribe(response => {
      if (response.success) {
        this.isFavorite = !this.isFavorite;
      }
    })
  }

}
