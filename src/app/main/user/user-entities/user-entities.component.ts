import { Component, OnInit } from '@angular/core';
import { UserService } from "app/main/user/user.service";
import { UserDataService } from "app/main/user/user-data.service";
import { SearchItem } from "app/main/search/search-item";
import { BaseService } from 'app/tools/base.service'; 

@Component({
  selector: 'app-user-entities',
  templateUrl: './user-entities.component.html',
  styleUrls: ['./user-entities.component.scss']
})
export class UserEntitiesComponent implements OnInit {

  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark',  scrollInertia: 500 };

  private items: Array<SearchItem>;

  private isLoading: boolean;

  constructor(private userDataService: UserDataService,
              private baseService: BaseService) { }

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
