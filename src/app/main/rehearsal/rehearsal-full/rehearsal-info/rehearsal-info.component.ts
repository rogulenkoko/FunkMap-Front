import { Component, OnInit, ViewChild } from '@angular/core';
import { Rehearsal } from "app/main/rehearsal/models/rehearsal-preview";
import { InfoItem } from "app/tools/entity-full/entity-info/entity-info.component";
import { EditService } from "app/tools/entity-full/edit.service";
import { TranslateService } from "@ngx-translate/core";
import { RehearsalService } from "app/main/rehearsal/rehearsal.service";

@Component({
  selector: 'rehearsal-info',
  templateUrl: './rehearsal-info.component.html',
  styleUrls: ['./rehearsal-info.component.scss']
})
export class RehearsalInfoComponent implements OnInit {

  private rehearsal: Rehearsal;
  private newRehearsal: Rehearsal;


  @ViewChild("descriptionEditTemplate") descriptionEditTemplate: any;

  private infoItems: Array<InfoItem>;

  private allTitle: string;


  constructor(private editService: EditService,
              private translateService: TranslateService,
              private rehearsalService: RehearsalService) {
     this.translateService.get("Choose").subscribe(value=> this.allTitle = value);
  }

  ngOnInit() {
    this.rehearsal = this.editService.baseModel as Rehearsal;
    this.updateInfoItems();
  }

  private updateInfoItems() {
    this.newRehearsal = Object.create(this.rehearsal);
    
    var descriptionItem = new InfoItem();
    descriptionItem.propertyTitle = "Musician_Description";
    descriptionItem.propertyValue = this.rehearsal.description;
    descriptionItem.propertyEditTemplate = this.descriptionEditTemplate;

    this.infoItems = [
      descriptionItem
    ]
  }

  private refreshRehearsal(login: string) {
    this.rehearsalService.getRehearsal(login).subscribe(band => {
      this.rehearsal = band;
      this.updateInfoItems();
      this.editService.baseModel = band;
      this.editService.onSaved.emit();
    })
  }

  save() {
    this.newRehearsal.login = this.rehearsal.login;
    this.rehearsalService.updateRehearsal(this.newRehearsal).subscribe(x => {
      this.refreshRehearsal(this.rehearsal.login);
    })
  }

  cancel() {
    this.refreshRehearsal(this.rehearsal.login);
    this.newRehearsal = Object.create(this.rehearsal);
  }

}
