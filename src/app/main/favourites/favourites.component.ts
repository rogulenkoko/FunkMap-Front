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

  private items: Array<SearchItem>;
  private isLoading: boolean;
  constructor(private baseService: BaseService) { }

  ngOnInit() {
    this.refresh();
  }

  private refresh() {
    this.isLoading = true;
    this.baseService.getFavourites().subscribe(items => {
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
    this.baseService.setFavourite(selected.login, selected.isFavourite).subscribe(x => {
      if (!x.success) {
        selected.isFavourite = false;
      }
    });
  }

}
