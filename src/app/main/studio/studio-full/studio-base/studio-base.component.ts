import { Component, OnInit, ViewChild } from '@angular/core';
import { EditService } from "app/tools/entity-full/edit.service";
import { Studio } from "app/main/studio/models/studio-preview";
import { StudioService } from "app/main/studio/studio.service";
import { InfoItem } from 'app/tools/entity-full/info-item';

@Component({
  selector: 'studio-base',
  templateUrl: './studio-base.component.html',
  styleUrls: ['./studio-base.component.scss']
})
export class StudioBaseComponent implements OnInit {

  public studio: Studio;
  public newStudio: Studio;

  public infoItems: Array<InfoItem>;


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

  public save(){
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
