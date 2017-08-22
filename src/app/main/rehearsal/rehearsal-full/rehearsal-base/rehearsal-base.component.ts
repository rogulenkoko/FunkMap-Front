import { Component, OnInit, ViewChild } from '@angular/core';
import { Rehearsal } from "app/main/rehearsal/models/rehearsal-preview";
import { InfoItem } from "app/tools/entity-full/entity-info/entity-info.component";
import { EditService } from "app/tools/entity-full/edit.service";
import { RehearsalService } from "app/main/rehearsal/rehearsal.service";

@Component({
  selector: 'rehearsal-base',
  templateUrl: './rehearsal-base.component.html',
  styleUrls: ['./rehearsal-base.component.scss']
})
export class RehearsalBaseComponent implements OnInit {

  private rehearsal: Rehearsal;
  private newRehearsal: Rehearsal;

  private infoItems: Array<InfoItem>;


  @ViewChild('nameEditTemplate') nameEditTemplate;
  @ViewChild('netsEditTemplate') netsEditTemplate;


  constructor(private editService: EditService,
              private rehearsalService: RehearsalService) { }


  ngOnInit() {
    this.rehearsal = this.editService.baseModel as Rehearsal;
    this.updateInfoItems();
  }

  private updateInfoItems(){
    this.newRehearsal = Object.create(this.rehearsal);

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
    this.newRehearsal.login = this.rehearsal.login;
    this.rehearsalService.updateRehearsal(this.newRehearsal).subscribe(response=>{
      this.refreshRehearsal();
    });
  }

  private refreshRehearsal(){
    this.rehearsalService.getRehearsal(this.rehearsal.login).subscribe(shop=>{
      this.rehearsal = shop;
      this.updateInfoItems();
    })
  }

}
