import { Component, OnInit } from '@angular/core';
import { SearchService } from "app/main/search/search.service";
import { SearchItem } from "app/main/search/search-item";
import { UserService } from "app/main/user/user.service";
import { NearestRequest } from "app/main/map/models";
import { UserDataService } from "app/main/user/user-data.service";
import { FavouritesService } from "app/main/favourites/favourites.service";
import { FullLocationRequest } from "app/main/search/search-location-request";
import { SearchFilterService } from "app/main/search/search-filter/search-filter.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private items: Array<SearchItem>;

  private isFilterEnabled: boolean = true;

  constructor(private searchService: SearchService,
    private userService: UserService,
    private favouritesService: FavouritesService,
    private filterService: SearchFilterService) {
    this.items = [];
    this.filterService.onFilterChanged.subscribe(()=>this.refresh());
  }

  ngOnInit() {
    this.refresh();
  }

  private refresh() {
    var request = new FullLocationRequest(this.userService.latitude, this.userService.longitude, 2);
    request.skip = 0;
    request.take = 10;

    if(this.isFilterEnabled){
      this.searchService.getFiltered().subscribe(items=>{
        this.onItemsLoaded(items);
      })
    } else {
      this.searchService.getNearest(request).subscribe(items => {
        this.onItemsLoaded(items);
      });
    }
  }

  private onItemsLoaded(items: Array<SearchItem>){
    this.items = items;
    if(this.userService.user) this.getFavourites();
  }

  private getFavourites() {
    this.favouritesService.getFavourites().subscribe(favourites => {
      this.items.forEach(item => {
        if (favourites.find(x => x.login == item.login)) {
          item.isFavourite = true;
        }
      });
    })
  }

  private getMore() {
    var request = new FullLocationRequest(this.userService.latitude, this.userService.longitude, 2);
    request.skip = this.items.length;
    request.take = this.items.length + 10;
    this.searchService.getNearest(request).subscribe(items => {
      this.items = this.items.concat(items);
      if(this.userService.user) this.getFavourites();
    });
  }

  private enableFilter(){
    this.isFilterEnabled = !this.isFilterEnabled;
  }

}
