import { Component, OnInit } from '@angular/core';
import { SearchService } from "app/main/search/search.service";
import { SearchItem } from "app/main/search/search-item";
import { UserService } from "app/main/user/user.service";
import { NearestRequest } from "app/main/map/models";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private items: Array<SearchItem>;

  private search: string;

  constructor(private searchService: SearchService,
              private userService: UserService) { }

  ngOnInit() {
    this.refresh();
  }

  private refresh(){
    var request = new NearestRequest(this.userService.latitude, this.userService.longitude, 2);
    this.searchService.getNearest(request).subscribe(items=>{
      this.items = items;
    });
  }

}
