import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopService } from "app/main/shop/shop.service";
import { EditService } from "app/tools/entity-full/edit.service";
import { Shop } from "app/main/shop/models";
import { InfoItem } from 'app/tools/entity-full/info-item';

@Component({
  selector: 'shop-base',
  templateUrl: './shop-base.component.html',
  styleUrls: ['./shop-base.component.scss']
})
export class ShopBaseComponent implements OnInit {


  public shop: Shop;
  public newShop: Shop;

  public infoItems: Array<InfoItem>;


  @ViewChild('nameEditTemplate') nameEditTemplate;
  @ViewChild('netsEditTemplate') netsEditTemplate;


  constructor(private editService: EditService,
              private shopService: ShopService) { }


  ngOnInit() {
    this.shop = this.editService.baseModel as Shop;
    this.updateInfoItems();
  }

  private updateInfoItems(){
    this.newShop = Object.create(this.shop);

    var nameInfoItem = new InfoItem();
    nameInfoItem.propertyTitle = "Musician_Name";
    nameInfoItem.propertyEditTemplate = this.nameEditTemplate;

    var netsInfoItem = new InfoItem();
    netsInfoItem.propertyTitle = "Musician_SocialNets";
    netsInfoItem.propertyEditTemplate = this.netsEditTemplate;

    this.infoItems = [
      nameInfoItem,
      netsInfoItem
    ]
  }

  public save(){
    this.newShop.login = this.shop.login;
    this.shopService.updateShop(this.newShop).subscribe(response=>{
      this.refreshBand();
    });
  }

  private refreshBand(){
    this.shopService.getShop(this.shop.login).subscribe(shop=>{
      this.shop = shop;
      this.updateInfoItems();
    })
  }

}
