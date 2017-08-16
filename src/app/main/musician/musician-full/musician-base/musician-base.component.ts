import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Musician } from "app/main/musician/models";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";
import { FavouritesService } from "app/main/favourites/favourites.service";
import { UserDataService } from "app/main/user/user-data.service";
import { UserService } from "app/main/user/user.service";
import { EditService } from "app/tools/entity-full/edit.service";

@Component({
  selector: 'musician-base',
  templateUrl: './musician-base.component.html',
  styleUrls: ['./musician-base.component.scss']
})
export class MusicianBaseComponent implements OnInit {

  private musician: Musician;

  constructor(private musicianTypesProvider: MusicianTypesProvider,
              private favouritesService: FavouritesService,
              private userDataService: UserDataService,
              private userService: UserService,
            private editService: EditService) {
    this.musician = this.editService.baseModel as Musician;
  }

  ngOnInit() {
    

  }

  

}
