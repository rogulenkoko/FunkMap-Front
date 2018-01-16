import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SearchService } from "app/main/search/search.service";
import { SearchItem } from "app/main/search/search-item";
import { UserService } from "app/main/user/user.service";
import { NearestRequest } from "app/main/map/models";
import { UserDataService } from "app/main/user/user-data.service";
import { FullLocationRequest } from "app/main/search/search-location-request";
import { SearchFilterService } from "app/main/search/search-filter/search-filter.service";
import 'rxjs/add/operator/distinctUntilChanged';
import { MapFilter } from "app/main/map/map-filter.service";
import { Subscription } from 'rxjs/Subscription';
import { BaseService } from 'app/tools/base.service';
import { environment } from 'environments/environment';

declare var $;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  public scrollbarOptions;

  private items: Array<SearchItem>;
  private allItemsCount: number;
  private portionCount: number = 10;

  private isLoaded: boolean = false;

  private subscription: Subscription;

  constructor(private searchService: SearchService,
    private userService: UserService,
    private filterService: SearchFilterService,
    private mapFilter: MapFilter,
    private baseService: BaseService) {
    this.items = [];
    this.subscription = new Subscription();
    this.subscription.add(this.filterService.onFilterChanged.subscribe(() => this.refresh()));
    this.subscription.add(this.filterService.searchChanged.debounceTime(200).subscribe((value) => {
      this.filterService.searchText = value;
      this.refresh();
    }));

    var that = this;
    this.scrollbarOptions = { 
      axis: 'y', 
      theme: 'minimal-dark',
      scrollInertia: 500,
      callbacks: {
        onTotalScrollOffset: 500,
        onTotalScroll: ()=> that.getMore()
      },
      advanced:{ updateOnContentResize: true } };
  }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    this.baseService.getFavouritesLogins().subscribe(favourites => {
      this.items.forEach(item => {
        if (favourites.find(x => x == item.login)) {
          item.isFavourite = true;
        }
      });
    });
  }

  private getMore() {
    if (this.items.length == this.allItemsCount) return;
    this.isLoaded = true;
    this.searchService.getFiltered(this.items.length, this.portionCount).subscribe(response => {
      this.isLoaded = false;
      this.items.push(...response.items);
      if (this.userService.user) this.getFavourites();
    });
  }


  private test(){
    console.log("test");
  }

  private enableFilter() {
    this.filterService.isFilterEnabled = !this.filterService.isFilterEnabled;
  }

  private clearFilter() {
    var isDone = this.filterService.clearFilter();
    if (isDone) this.filterService.onFilterChanged.emit();
  }

  private onTextChanged(value: string) {
    this.filterService.searchChanged.next(value);
  }

}
