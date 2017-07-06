import { Injectable } from '@angular/core';
import { ShopService } from "app/main/shop/shop.service";
import { ShopPreview } from "app/main/shop/models";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ShopServiceStub extends ShopService {

  constructor() {
    super();
  }

  getShop(login: string): Observable<ShopPreview> {
    var s = new ShopPreview("login", "Shop");
    return Observable.of(s);
  }

}
