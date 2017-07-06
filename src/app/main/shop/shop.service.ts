import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ShopPreview } from "app/main/shop/models";
import { HttpClient } from "app/core/http/http-client.service";
import { ConfigurationProvider } from "app/core";

@Injectable()
export abstract class ShopService {

  constructor() { }

  abstract getShop(login: string): Observable<ShopPreview>;

}

@Injectable()
export class ShopServiceHttp extends ShopService {

  constructor(private http: HttpClient) {
    super();
  }

  getShop(login: string): Observable<ShopPreview> {
    return this.http.get(`${ConfigurationProvider.apiUrl}shop/get/${login}`).map(x=>ShopPreview.ToShopPreview(x.json()));
  }

}
