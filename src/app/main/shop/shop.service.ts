import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ShopPreview, Shop } from "app/main/shop/models";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider } from "app/core";
import { BaseResponse } from "app/tools";
import { ServiceType } from "app/core/configuration/configuration-provider";
import { EntityType } from "app/main/map/models";

@Injectable()
export abstract class ShopService {

  constructor() { }

  abstract getShopPreview(login: string): Observable<ShopPreview>;
  abstract getShop(login: string): Observable<Shop>;

  abstract updateShop(shop: Shop): Observable<BaseResponse>;

}

@Injectable()
export class ShopServiceHttp extends ShopService {

  constructor(private http: HttpClient) {
    super();
  }

  getShopPreview(login: string): Observable<ShopPreview> {
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/profile-preview/${login}`).map(x => ShopPreview.ToShopPreview(x.json()));
  }

  getShop(login: string): Observable<Shop> {
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/profile/${login}`).map(x => Shop.ToShop(x.json()));
  }

  updateShop(shop: Shop): Observable<BaseResponse> {
    shop.entityType = EntityType.Shop;
    return this.http.put(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/profile`, shop).map(x => BaseResponse.ToBaseResponse(x.json()));
  }

}
