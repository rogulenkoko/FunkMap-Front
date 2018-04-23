import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SearchItem } from "app/main/search/search-item";
import { UserService } from "app/main/user/user.service";
import { MapFilter } from "app/main/map/map-filter.service";
import { Marker, EntityType } from "app/main/map/models";
import { UserDataService } from "app/main/user/user-data.service";
import { Router } from "@angular/router";
import { RouteBuilder } from "app/tools/route-builder";
import { BaseService } from 'app/tools/base.service';

@Component({
  selector: 'search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit, OnDestroy {

  @Input() items: Array<SearchItem>;

  constructor(private userService: UserService,
    private baseService: BaseService,
    private mapFilter: MapFilter,
    private userDataService: UserDataService,
    private router: Router) { }

ngOnInit() {

  }

  ngOnDestroy(){
    this.items = undefined;
  }


  private changeFavourite(login: string) {
    var selected = this.items.find(x => x.login == login);
    selected.isFavourite = !selected.isFavourite;
    this.baseService.setFavourite(selected.login, selected.isFavourite).subscribe(x => {
      if (!x.success) {
        selected.isFavourite = false;
      }
    });
  }

  selectMarkerOnMap(item: SearchItem) {
    var marker = new Marker(item.login, item.latitude, item.longitude, item.type);
    this.mapFilter.onOutItemsSelected.emit(marker);
  }
  
  private navigate(login: string, type: EntityType){
    var route = RouteBuilder.buildRoute(type, login);
    this.router.navigate([route]);
  }

}
