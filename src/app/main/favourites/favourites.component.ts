import { Component, OnInit } from '@angular/core';
import { FavouritesService } from "app/main/favourites/favourites.service";
import { SearchItem } from "app/main/search/search-item";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  private items: Array<SearchItem>;
  private isLoading: boolean;
  constructor(private favouritesService: FavouritesService) { }

  ngOnInit() {
    this.refresh();
  }

  private refresh() {
    this.isLoading = true;
    this.favouritesService.getFavourites().subscribe(items => {
      this.items = items;
      this.isLoading = false;
      this.items.forEach(item => {
        item.isFavourite = true;
      });
    });
  }

  private changeFavourite(login: string) {
    var selected = this.items.find(x => x.login == login);
    selected.isFavourite = !selected.isFavourite;
    this.favouritesService.setFavourite(selected.login).subscribe(x => {
      if (!x.success) {
        selected.isFavourite = false;
      }
    });
  }

}
