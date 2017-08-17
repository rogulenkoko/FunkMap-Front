import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Musician } from "app/main/musician/models";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";
import { FavouritesService } from "app/main/favourites/favourites.service";
import { UserDataService } from "app/main/user/user-data.service";
import { UserService } from "app/main/user/user.service";
import { EditService } from "app/tools/entity-full/edit.service";
import { InfoItem } from "app/tools/entity-full/entity-info/entity-info.component";
import { MusicianService } from "app/main/musician/musician.service";

@Component({
  selector: 'musician-base',
  templateUrl: './musician-base.component.html',
  styleUrls: ['./musician-base.component.scss']
})
export class MusicianBaseComponent implements OnInit {

  private musician: Musician;
  private newMusician: Musician;

  private infoItems: Array<InfoItem>;


  @ViewChild('nameEditTemplate') nameEditTemplate;
  @ViewChild('netsEditTemplate') netsEditTemplate;

  constructor(private musicianTypesProvider: MusicianTypesProvider,
              private favouritesService: FavouritesService,
              private userDataService: UserDataService,
              private userService: UserService,
              private editService: EditService,
              private musicianService: MusicianService) {
    this.musician = this.editService.baseModel as Musician;

    this.editService.onSaved.subscribe(()=>this.onChanged())
  }

  ngOnInit() {
    this.updateInfoItems();
  }

   private updateInfoItems(){
    this.newMusician = Object.create(this.musician);

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

  private save(){
    this.newMusician.login = this.musician.login;
    this.musicianService.updateMusician(this.newMusician).subscribe(response=>{
      this.refreshMusician();
    });
  }

  private onChanged(){
    this.musician = this.editService.baseModel as Musician;
     this.updateInfoItems();
  }

  private refreshMusician(){
    this.musicianService.getMusician(this.musician.login).subscribe(musician=>{
        this.musician = musician;
        this.updateInfoItems();
      })
  }
}
