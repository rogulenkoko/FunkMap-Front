import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoItem } from "app/tools/entity-full/entity-info/entity-info.component";
import { EditService } from "app/tools/entity-full/edit.service";
import { Studio } from "app/main/studio/models/studio-preview";
import { StudioService } from "app/main/studio/studio.service";

@Component({
  selector: 'studio-base',
  templateUrl: './studio-base.component.html',
  styleUrls: ['./studio-base.component.scss']
})
export class StudioBaseComponent implements OnInit {

  private studio: Studio;
  private newStudio: Studio;

  private infoItems: Array<InfoItem>;


  @ViewChild('nameEditTemplate') nameEditTemplate;
  @ViewChild('netsEditTemplate') netsEditTemplate;


  constructor(private editService: EditService,
              private studioService: StudioService) { }


  ngOnInit() {
    this.studio = this.editService.baseModel as Studio;
    this.updateInfoItems();
  }

  private updateInfoItems(){
    this.newStudio = Object.create(this.studio);

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
    this.newStudio.login = this.studio.login;
    this.studioService.updateStudio(this.newStudio).subscribe(response=>{
      this.refreshStudio();
    });
  }

  private refreshStudio(){
    this.studioService.getStudio(this.studio.login).subscribe(studio=>{
      this.studio = studio;
      this.updateInfoItems();
    })
  }

}
