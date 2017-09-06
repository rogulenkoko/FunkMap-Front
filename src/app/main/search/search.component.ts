import { Component, OnInit } from '@angular/core';
import { SearchService } from "app/main/search/search.service";
import { SearchItem } from "app/main/search/search-item";
import { UserService } from "app/main/user/user.service";
import { NearestRequest } from "app/main/map/models";
import { UserDataService } from "app/main/user/user-data.service";
import { FavouritesService } from "app/main/favourites/favourites.service";
import { FullLocationRequest } from "app/main/search/search-location-request";
import { SearchFilterService } from "app/main/search/search-filter/search-filter.service";
import 'rxjs/add/operator/distinctUntilChanged';
import { MapFilter } from "app/main/map/map-filter.service";

declare var $;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private items: Array<SearchItem>;
  private allItemsCount: number;
  private portionCount: number = 10;

  private isLoaded: boolean = false;

  constructor(private searchService: SearchService,
    private userService: UserService,
    private favouritesService: FavouritesService,
    private filterService: SearchFilterService,
    private mapFilter: MapFilter) {
    this.items = [];
    this.filterService.onFilterChanged.subscribe(() => this.refresh());
    this.filterService.searchChanged.debounceTime(200).subscribe((value) => {
      this.filterService.searchText = value;
      this.refresh();
    });
  }

  ngOnInit() {
    this.refresh();
    $('#search-container').on("scroll", ()=> this.onScrollDown());
  }

  

  private refresh() {
    this.isLoaded = true;
    this.items = [];
    this.searchService.getFiltered(0, this.portionCount).subscribe(response => {
      this.isLoaded = false;
      this.onItemsLoaded(response.items);
      this.mapFilter.onItemsFiltered.emit(response.allLogins);
      this.allItemsCount = response.allCount;
    });
  }

  private onItemsLoaded(items: Array<SearchItem>) {
    this.items = items;
    if (this.userService.user) this.getFavourites();
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
    if(this.items.length == this.allItemsCount) return;
    this.isLoaded = true;
    this.searchService.getFiltered(this.items.length, this.items.length + this.portionCount).subscribe(response => {
      this.isLoaded = false;
      this.items.push(...response.items)
      //this.items = .concat();
      if (this.userService.user) this.getFavourites();
    });
  }

  private enableFilter() {
    this.filterService.isFilterEnabled = !this.filterService.isFilterEnabled;
  }

  private clearFilter() {
    var isDone = this.filterService.clearFilter();
    if(isDone) this.filterService.onFilterChanged.emit();
  }

  private onTextChanged(value: string) {
    this.filterService.searchChanged.next(value);
  }

  private onScrollDown(){
    // console.log("sadasd");
    // console.log("top", $('#search-container').scrollTop());
    // console.log("height", $('#search-container').height());
    // console.log("scrolheight", $('#search-container')[0].scrollHeight);
    if ($('#search-container').scrollTop() + $('#search-container').height() >= $('#search-container')[0].scrollHeight) {
        this.getMore();
      }
  }

}
