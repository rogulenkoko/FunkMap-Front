import { Component, OnInit, ViewChild } from '@angular/core';
import { Marker, EntityType } from "app/main/map/models";
import { Shop } from "app/main/shop/models";
import { EntityMapComponent } from "app/tools/entity-full/entity-map/entity-map.component";
import { MapCreationService } from "app/main/map/map-creation.service";
import { IconProvider } from "app/main/map/icon-provider.service";
import { EditService } from "app/tools/entity-full/edit.service";
import { ShopService } from "app/main/shop/shop.service";
import { RouteBuilder } from 'app/tools/route-builder';
import { Router } from '@angular/router';

@Component({
  selector: 'shop-map',
  templateUrl: './shop-map.component.html',
  styleUrls: ['./shop-map.component.scss']
})
export class ShopMapComponent implements OnInit {

   @ViewChild('entityMap') entityMap: EntityMapComponent;

  private shop: Shop;
  public marker: Marker;

  constructor(private mapCreationService: MapCreationService,
              private iconProvider: IconProvider,
              private shopService: ShopService,
              private editService: EditService,
              private router: Router) { 
    this.shop = this.editService.baseModel as Shop;
  }

  ngOnInit() {
    this.mapCreationService.address = this.shop.address;
    this.marker = this.buildMarker();
  }

  private buildMarker():Marker{
    var marker = new Marker(this.shop.login, this.shop.latitude, this.shop.longitude, EntityType.Shop);
    marker.iconUrl = this.iconProvider.getIcon(marker);
    return marker;
  }

  public onBaseSaved(){
    var shop = new Shop();
    shop.login = this.editService.baseModel.login;
    shop.latitude = this.editService.baseModel.latitude;
    shop.longitude = this.editService.baseModel.longitude;
    shop.address = this.mapCreationService.address;
    this.shopService.updateShop(shop).subscribe(response => {
      this.router.navigate([RouteBuilder.buildRoute(this.marker.entityType, this.marker.login)]);
    });
  }

}
