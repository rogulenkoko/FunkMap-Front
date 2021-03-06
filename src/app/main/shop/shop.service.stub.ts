import { Injectable } from '@angular/core';
import { ShopService } from "app/main/shop/shop.service";
import { ShopPreview, Shop } from "app/main/shop/models";
import { Observable } from "rxjs/Observable";
import { BaseResponse } from "app/tools";
import { EntityType } from "app/main/map/models";

@Injectable()
export class ShopServiceStub extends ShopService {

  constructor() {
    super();
  }

  getShop(login: string): Observable<ShopPreview> {
    var s = new Shop("test", "Shop", EntityType.Shop);
    s.facebookLink = "asd";
    s.soundCloudLink = "aaa";
    s.latitude = 60;
    s.longitude = 30;
    s.webSite = "https://vmgitlab01.scout-gps.ru:1443/scout/fuel_cards/pipelines";
    s.description = "Суперклевый магазин!"
    return Observable.of(s);
  }

  getShopPreview(login: string): Observable<ShopPreview> {
   var s = new ShopPreview("login", "Shop", EntityType.Shop);
    return Observable.of(s);
  }

  updateShop(shop: Shop): Observable<BaseResponse>{
      return Observable.of(new BaseResponse(true));
   }

}
