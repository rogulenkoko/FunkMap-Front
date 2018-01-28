import { Component, OnInit } from '@angular/core';
import { EditService } from "app/tools/entity-full/edit.service";
import { ActivatedRoute } from "@angular/router";
import { ShopService } from "app/main/shop/shop.service";
import { UserDataService } from 'app/main/user/user-data.service';
import { UserService } from 'app/main/user/user.service';
import { EditableCardContainer } from 'app/tools/entity-full/editable-card';

@Component({
  selector: 'app-shop-full',
  templateUrl: './shop-full.component.html',
  styleUrls: ['./shop-full.component.scss'],
  providers: [EditService]
})
export class ShopFullComponent extends EditableCardContainer implements OnInit {

  constructor(public editService: EditService,
              private shopService: ShopService,
              private route: ActivatedRoute,
              userService: UserService,
              userDataService: UserDataService) {
    super(userService, userDataService);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var login = params["id"];
      this.refreshBand(login);
    })
  }

  private refreshBand(login: string) {
    this.checkIsUserEntity(login).subscribe(isUsers=>{
      this.editService.isUsers = isUsers;
      this.shopService.getShop(login).subscribe(shop => {
        this.editService.baseModel = shop;
      });
    })
    
  }

}
