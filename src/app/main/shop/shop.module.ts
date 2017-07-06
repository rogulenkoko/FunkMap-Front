import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from "app/core/core.module";
import { ToolsModule } from "app/tools/tools.module";
import { ShopComponent } from './shop.component';
import { ShopService, ShopServiceHttp } from "app/main/shop/shop.service";
import { environment } from "environments/environment";
import { ShopServiceStub } from "app/main/shop/shop.service.stub";
import { SearchShopComponent } from './search-shop/search-shop.component';

@NgModule({
  imports: [
    CoreModule,
    ToolsModule
  ],
  declarations: [ShopComponent, SearchShopComponent],
  exports: [ShopComponent, SearchShopComponent],
  providers: [
    {
      provide: ShopService,
      useClass: environment.production ? ShopServiceHttp : ShopServiceStub
    }
  ]
})
export class ShopModule { }
