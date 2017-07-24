import { Component, OnInit, Input } from '@angular/core';
import { Musician } from "app/main/musician/models";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";
import { FavouritesService } from "app/main/favourites/favourites.service";

@Component({
  selector: 'musician-base',
  templateUrl: './musician-base.component.html',
  styleUrls: ['./musician-base.component.scss']
})
export class MusicianBaseComponent implements OnInit {

  @Input() musician: Musician;
  private isFavorite: boolean;

  constructor(private musicianTypesProvider: MusicianTypesProvider,
              private favouritesService: FavouritesService) { }

  ngOnInit() {
    console.log(this.musician);

    this.favouritesService.getFavouritesLogins().subscribe(favorites=>{
      if(favorites.find(x=>x == this.musician.login)){
        this.isFavorite = true;
      } else {
        this.isFavorite = false;
      }
    })
  }

  private addToFavorites() {
    this.favouritesService.setFavourite(this.musician.login).subscribe(response => {
      if (response.success) {
        this.isFavorite = !this.isFavorite;
      }
    })
  }

}
