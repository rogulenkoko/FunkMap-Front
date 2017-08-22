import { Component, OnInit } from '@angular/core';
import { EditService } from "app/tools/entity-full/edit.service";
import { ActivatedRoute } from "@angular/router";
import { ShopService } from "app/main/shop/shop.service";

@Component({
  selector: 'app-shop-full',
  templateUrl: './shop-full.component.html',
  styleUrls: ['./shop-full.component.scss'],
  providers: [EditService]
})
export class ShopFullComponent implements OnInit {

  constructor(private editService: EditService,
              private shopService: ShopService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var login = params["id"];
      this.refreshBand(login);
    })
  }

  private refreshBand(login: string) {
    this.shopService.getShop(login).subscribe(shop => {
      this.editService.baseModel = shop;
    })
  }

}
