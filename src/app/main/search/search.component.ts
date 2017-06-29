import { Component, OnInit } from '@angular/core';
import { SearchService } from "app/main/search/search.service";
import { SearchItem } from "app/main/search/search-item";
import { UserService } from "app/main/user/user.service";
import { NearestRequest } from "app/main/map/models";
import { UserDataService } from "app/main/user/user-data.service";
import { FavouritesService } from "app/main/favourites/favourites.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private items: Array<SearchItem>;

  private search: string;

  constructor(private searchService: SearchService,
    private userService: UserService,
    private favouritesService: FavouritesService) { }

  ngOnInit() {
    this.refresh();
  }

  private refresh() {
    var request = new NearestRequest(this.userService.latitude, this.userService.longitude, 2);
    this.searchService.getNearest(request).subscribe(items => {
      this.items = items;
      this.favouritesService.getFavouritesLogins().subscribe(favourites => {
        this.items.forEach(item => {
          if (favourites.find(x => x == item.login)) {
            item.isFavourite = true;
          }
        });
      })
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
