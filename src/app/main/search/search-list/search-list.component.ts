import { Component, OnInit, Input } from '@angular/core';
import { SearchItem } from "app/main/search/search-item";
import { UserService } from "app/main/user/user.service";
import { FavouritesService } from "app/main/favourites/favourites.service";

@Component({
  selector: 'search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  @Input() items: Array<SearchItem>;

  constructor(private userService: UserService,
              private favouritesService: FavouritesService) { }

  ngOnInit() {
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