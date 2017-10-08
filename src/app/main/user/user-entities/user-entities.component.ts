import { Component, OnInit } from '@angular/core';
import { UserService } from "app/main/user/user.service";
import { UserDataService } from "app/main/user/user-data.service";
import { SearchItem } from "app/main/search/search-item";
import { FavouritesService } from "app/main/favourites/favourites.service";

@Component({
  selector: 'app-user-entities',
  templateUrl: './user-entities.component.html',
  styleUrls: ['./user-entities.component.scss']
})
export class UserEntitiesComponent implements OnInit {

  private items: Array<SearchItem>;

  private isLoading: boolean;

  constructor(private userDataService: UserDataService) { }

  ngOnInit() {
    this.refreshEntities();
  }

  private refreshEntities(){
    this.isLoading = true;
    this.userDataService.getUserEntities().subscribe(items=>{
      this.items = items;
      this.isLoading = false;
    });
  }

}
