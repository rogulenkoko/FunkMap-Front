import { Component, OnInit, ViewChild } from '@angular/core';
import { EditService } from "app/tools/entity-full/edit.service";
import { TranslateService } from "@ngx-translate/core";
import { Shop } from "app/main/shop/models";
import { ShopService } from "app/main/shop/shop.service";
import { InfoItem } from 'app/tools/entity-full/info-item';

@Component({
  selector: 'shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.scss']
})
export class ShopInfoComponent implements OnInit {

  public shop: Shop;
  public newShop: Shop;


  @ViewChild("descriptionEditTemplate") descriptionEditTemplate: any;
  @ViewChild("webSiteEditTemplate") webSiteEditTemplate: any;
  @ViewChild("webSiteValueTemplate") webSiteValueTemplate: any;

  public infoItems: Array<InfoItem>;

  public allTitle: string;


  constructor(private editService: EditService,
              private translateService: TranslateService,
              private shopService: ShopService) {
     this.translateService.get("Choose").subscribe(value=> this.allTitle = value);
  }

  ngOnInit() {
    this.shop = this.editService.baseModel as Shop;
    this.updateInfoItems();
  }

  private updateInfoItems() {
    this.newShop = Object.create(this.shop);


    var webSiteInfoItem = new InfoItem();
    webSiteInfoItem.propertyTitle = "Website";
    webSiteInfoItem.propertyTemplate = this.webSiteValueTemplate;
    webSiteInfoItem.propertyEditTemplate = this.webSiteEditTemplate;
    
    var descriptionItem = new InfoItem();
    descriptionItem.propertyTitle = "Musician_Description";
    descriptionItem.propertyValue = this.shop.description;
    descriptionItem.propertyEditTemplate = this.descriptionEditTemplate;

    this.infoItems = [
      webSiteInfoItem,
      descriptionItem
    ]
  }

  private refreshShop(login: string) {
    this.shopService.getShop(login).subscribe(band => {
      this.shop = band;
      this.updateInfoItems();
      this.editService.baseModel = band;
      this.editService.onSaved.emit();
    })
  }

  save() {
    this.newShop.login = this.shop.login;
    this.shopService.updateShop(this.newShop).subscribe(x => {
      this.refreshShop(this.shop.login);
    })
  }

  cancel() {
    this.refreshShop(this.shop.login);
    this.newShop = Object.create(this.shop);
  }

}
