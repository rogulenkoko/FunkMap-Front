import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from "app/core";
import { MusicStyle, ExpirienceType } from "app/main/musician/models";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";
import { FavouritesService } from "app/main/favourites/favourites.service";
import { UserService } from "app/main/user/user.service";

@Component({
  selector: 'entity-side',
  templateUrl: './entity-side.component.html',
  styleUrls: ['./entity-side.component.scss']
})
export class EntitySideComponent implements OnInit {

  @Input() item: BaseModel;

  @Input() styles: Array<MusicStyle>;
  @Input() description: string;

  @Input() expirience: ExpirienceType;
  @Input() address: string;
  @Input() website: string;

  private avatarImage: string;
  private isFavorite: boolean;

  constructor(private typesProvider: MusicianTypesProvider,
    private favouritesService: FavouritesService,
    private userService: UserService) { }

  ngOnInit() {
    if (this.item) this.avatarImage = "data:image/png;base64," + this.item.avatar;
    this.favouritesService.getFavouritesLogins().subscribe(favorites=>{
      if(favorites.find(x=>x == this.item.login)){
        this.isFavorite = true;
      } else {
        this.isFavorite = false;
      }
    })
  }

  private addToFavorites() {
    this.favouritesService.setFavourite(this.item.login).subscribe(response => {
      if (response.success) {
        this.isFavorite = !this.isFavorite;
      }
    })
  }
}
