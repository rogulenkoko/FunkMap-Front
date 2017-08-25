import { Component, OnInit, ViewChild } from '@angular/core';
import { Studio } from "app/main/studio/models/studio-preview";
import { InfoItem } from "app/tools/entity-full/entity-info/entity-info.component";
import { EditService } from "app/tools/entity-full/edit.service";
import { TranslateService } from "@ngx-translate/core";
import { StudioService } from "app/main/studio/studio.service";

@Component({
  selector: 'studio-info',
  templateUrl: './studio-info.component.html',
  styleUrls: ['./studio-info.component.scss']
})
export class StudioInfoComponent implements OnInit {

  private studio: Studio;
  private newStudio: Studio;


  @ViewChild("descriptionEditTemplate") descriptionEditTemplate: any;
  @ViewChild("webSiteEditTemplate") webSiteEditTemplate: any;
  @ViewChild("webSiteValueTemplate") webSiteValueTemplate: any;

  private infoItems: Array<InfoItem>;

  private allTitle: string;


  constructor(private editService: EditService,
              private translateService: TranslateService,
              private studioService: StudioService) {
     this.translateService.get("Choose").subscribe(value=> this.allTitle = value);
  }

  ngOnInit() {
    this.studio = this.editService.baseModel as Studio;
    this.updateInfoItems();
  }

  private updateInfoItems() {
    this.newStudio = Object.create(this.studio);
    
    var descriptionItem = new InfoItem();
    descriptionItem.propertyTitle = "Musician_Description";
    descriptionItem.propertyValue = this.studio.description;
    descriptionItem.propertyEditTemplate = this.descriptionEditTemplate;

    this.infoItems = [
      descriptionItem
    ]
  }

  private refreshStudio(login: string) {
    this.studioService.getStudio(login).subscribe(band => {
      this.studio = band;
      this.updateInfoItems();
      this.editService.baseModel = band;
      this.editService.onSaved.emit();
    })
  }

  save() {
    this.newStudio.login = this.studio.login;
    this.studioService.updateStudio(this.newStudio).subscribe(x => {
      this.refreshStudio(this.studio.login);
    })
  }

  cancel() {
    this.refreshStudio(this.studio.login);
    this.newStudio = Object.create(this.studio);
  }

}
