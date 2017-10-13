import { Component, OnInit } from '@angular/core';
import { FavouritesService } from "app/main/favourites/favourites.service";
import { SearchItem } from "app/main/search/search-item";
import { UserDataService } from 'app/main/user/user-data.service';
import { BaseService } from 'app/tools/base.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  private items: Array<SearchItem>;
  private isLoading: boolean;
  constructor(private favouritesService: FavouritesService,
              private baseService: BaseService) { }

  ngOnInit() {
    this.refresh();
  }

  private refresh() {
    this.isLoading = true;
    this.favouritesService.getFavourites().subscribe(items => {
      this.items = items;
      this.getAvatars(this.items);
      this.isLoading = false;
      this.items.forEach(item => {
        item.isFavourite = true;
      });
    });
  }

  private getAvatars(items: Array<SearchItem>) {
    var ids = items.filter(x => x.imageId).map(x => x.imageId);
    this.baseService.getEntitiesImages(ids).subscribe(infos => {
      items.forEach(item => {
        var info = infos.find(x=>x.id == item.imageId);
        if(info){
          item.image = info.image;
        }
      });
    });
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
