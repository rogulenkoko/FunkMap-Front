import { Component, OnInit } from '@angular/core';
import { ShopService } from "app/main/shop/shop.service";
import { ShopPreview } from "app/main/shop/models";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  private shop: ShopPreview;

  constructor(private shopService: ShopService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(x=>{
      this.updateShop(x["id"]);
    });
  }

  private updateShop(login: string){
    this.shopService.getShop(login).subscribe(shop=>{
      this.shop = shop;
      console.log(shop);
    })
  }

}
