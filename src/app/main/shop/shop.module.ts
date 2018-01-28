import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from "app/core/core.module";
import { ToolsModule } from "app/tools/tools.module";
import { ShopComponent } from './shop.component';
import { ShopService, ShopServiceHttp } from "app/main/shop/shop.service";
import { environment } from "environments/environment";
import { ShopServiceStub } from "app/main/shop/shop.service.stub";
import { SearchShopComponent } from './search-shop/search-shop.component';
import { ShopFullComponent } from './shop-full/shop-full.component';
import { ShopBaseComponent } from './shop-full/shop-base/shop-base.component';
import { ShopInfoComponent } from './shop-full/shop-info/shop-info.component';
import { ShopMapComponent } from './shop-full/shop-map/shop-map.component';

@NgModule({
  imports: [
    CoreModule,
    ToolsModule
  ],
  declarations: [ShopComponent, SearchShopComponent, ShopFullComponent, ShopBaseComponent, ShopInfoComponent, ShopMapComponent],
  exports: [ShopComponent, SearchShopComponent],
  providers: [
    {
      provide: ShopService,
      useClass: environment.useServer ? ShopServiceHttp : ShopServiceStub
    }
  ]
})
export class ShopModule { }
