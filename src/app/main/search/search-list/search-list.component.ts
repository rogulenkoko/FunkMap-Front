import { Component, OnInit, Input } from '@angular/core';
import { SearchItem } from "app/main/search/search-item";
import { UserService } from "app/main/user/user.service";
import { FavouritesService } from "app/main/favourites/favourites.service";
import { MapFilter } from "app/main/map/map-filter.service";
import { Marker } from "app/main/map/models";
import { UserDataService } from "app/main/user/user-data.service";

@Component({
  selector: 'search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  @Input() items: Array<SearchItem>;

  private userEntities: Array<string> = [];

  constructor(private userService: UserService,
    private favouritesService: FavouritesService,
    private mapFilter: MapFilter,
    private userDataService: UserDataService) { }

  ngOnInit() {
    this.getFavouriteLogins();
  }

  private getFavouriteLogins(){
    if(!this.userService.user) return;
    this.userDataService.getUserEntitiesLogins().subscribe(userItems => {
      this.userEntities = userItems;
    })
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

  selectMarkerOnMap(item: SearchItem) {
    var marker = new Marker(item.login, item.latitude, item.longitude, item.type);
    this.mapFilter.onOutItemsSelected.emit(marker);
  }

  private checkIfUserEntity(login: string): boolean {
    return this.userEntities.find(x => x == login) ? true : false;
  }

}
