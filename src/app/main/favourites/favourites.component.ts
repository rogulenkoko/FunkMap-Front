import { Component, OnInit } from '@angular/core';
import { SearchItem } from "app/main/search/search-item";
import { UserDataService } from 'app/main/user/user-data.service';
import { BaseService } from 'app/tools/base.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark',  scrollInertia: 500 };

  public items: Array<SearchItem>;
  public isLoading: boolean;
  constructor(private baseService: BaseService) { }

  ngOnInit() {
    this.refresh();
  }

  private refresh() {
    this.isLoading = true;
    this.baseService.getFavourites().subscribe(items => {
      this.items = items;
      this.isLoading = false;
      this.items.forEach(item => {
        item.isFavourite = true;
      });
    });
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

}
