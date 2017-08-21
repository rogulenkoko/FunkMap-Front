import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Band } from "app/main/band/models";
import { EditService } from "app/tools/entity-full/edit.service";
import { InfoItem } from "app/tools/entity-full/entity-info/entity-info.component";
import { BandService } from "app/main/band/band.service";

@Component({
  selector: 'band-base',
  templateUrl: './band-base.component.html',
  styleUrls: ['./band-base.component.scss']
})
export class BandBaseComponent implements OnInit {

  private band: Band;
  private newBand: Band;

  private infoItems: Array<InfoItem>;

  @ViewChild('nameEditTemplate') nameEditTemplate;
  @ViewChild('netsEditTemplate') netsEditTemplate;

  constructor(private editService: EditService,
              private bandService: BandService) { }

  ngOnInit() {
    this.band = this.editService.baseModel as Band;
    this.updateInfoItems();
  }

  private updateInfoItems(){
    this.newBand = Object.create(this.band);

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
    this.newBand.login = this.band.login;
    this.bandService.updateBand(this.newBand).subscribe(response=>{
      this.refreshBand();
    });
  }

  private refreshBand(){
    this.bandService.getBand(this.band.login).subscribe(band=>{
      this.band = band;
      this.updateInfoItems();
    })
  }

}
