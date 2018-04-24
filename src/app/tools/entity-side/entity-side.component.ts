import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from "app/core";
import { MusicStyle, ExpirienceType } from "app/main/musician/models";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";
import { UserService } from "app/main/user/user.service";
import { UserDataService } from "app/main/user/user-data.service";
import { RouteBuilder } from "app/tools/route-builder";
import { Router, ActivatedRoute } from "@angular/router";
import { BaseService } from 'app/tools/base.service';
import { AdaptiveService } from 'app/tools/adaptive.service';

@Component({
  selector: 'entity-side',
  templateUrl: './entity-side.component.html',
  styleUrls: ['./entity-side.component.scss']
})
export class EntitySideComponent implements OnInit {

  private _item: BaseModel;

  @Input() get item(): BaseModel{
    return this._item;
  }

  set item(value: BaseModel){
    this._item = value;
    console.log(value);
    this.checkIsUserEntity();
  }

  @Input() styles: Array<MusicStyle>;
  @Input() description: string;

  @Input() expirience: ExpirienceType;
  @Input() address: string;
  @Input() website: string;
  private isFavorite: boolean;
  private isUsers: boolean;

  constructor(private typesProvider: MusicianTypesProvider,
    private userService: UserService,
    private userDataService: UserDataService,
    private router: Router,
    private route: ActivatedRoute,
    private baseService: BaseService,
    private adaptiveService: AdaptiveService) { }

  ngOnInit() {

    if(this.adaptiveService.isMobile()){
      this.navigateToPage(this.item.login);
      return;
    }

    this.checkIsFavorite();
  }

  private checkIsUserEntity() {
    if(!this.userService.user) return;
    this.isUsers = this.userService.user.login == this.item.userLogin;
  }

  private checkIsFavorite() {
    if(!this.userService.user) return;
    this.baseService.getFavouritesLogins().subscribe(favorites => {
      if (favorites.find(x => x == this.item.login)) {
        this.isFavorite = true;
      } else {
        this.isFavorite = false;
      }
    })
  }

  private addToFavorites() {
    this.isFavorite = !this.isFavorite;
    this.baseService.setFavourite(this.item.login, this.isFavorite).subscribe(response => {
      if (response.success) {
        
      }
    })
  }

  private navigateToPage(login: string){
    var route = RouteBuilder.buildRoute(this.item.entityType, login);
    this.router.navigate([route]);
  }
}
