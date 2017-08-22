import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ShopPreview, Shop } from "app/main/shop/models";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider } from "app/core";
import { BaseResponse } from "app/tools";

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
    return this.http.get(`${ConfigurationProvider.apiUrl}shop/get/${login}`).map(x=>ShopPreview.ToShopPreview(x.json()));
  }

   getShop(login: string): Observable<Shop>{
      return this.http.get(`${ConfigurationProvider.apiUrl}shop/getFull/${login}`).map(x=>Shop.ToShop(x.json()));
   }

   updateShop(shop: Shop): Observable<BaseResponse>{
      return this.http.post(`${ConfigurationProvider.apiUrl}shop/edit`, shop).map(x=>BaseResponse.ToBaseResponse(x.json()));
   }

}
