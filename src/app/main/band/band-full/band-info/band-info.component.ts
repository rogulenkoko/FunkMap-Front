import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Band } from "app/main/band/models";
import { EditService } from "app/tools/entity-full/edit.service";
import { StylesItem } from "app/tools/select";
import { TranslateService } from "@ngx-translate/core";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";
import { BandService } from "app/main/band/band.service";
import { InfoItem } from 'app/tools/entity-full/info-item';

@Component({
  selector: 'band-info',
  templateUrl: './band-info.component.html',
  styleUrls: ['./band-info.component.scss']
})
export class BandInfoComponent implements OnInit {

  private band: Band;
  private newBand: Band;

  private styles: Array<StylesItem>;

  @ViewChild("descriptionEditTemplate") descriptionEditTemplate: any;
  @ViewChild("stylesEditTemplate") stylesEditTemplate: any;

  private infoItems: Array<InfoItem>;

  private allTitle: string;


  constructor(private editService: EditService,
              private translateService: TranslateService,
              private musicianTypesProvider: MusicianTypesProvider,
              private bandService: BandService) {
    this.styles = musicianTypesProvider.musicStyles.keys().map(x => new StylesItem(x, this.translateService.get(musicianTypesProvider.musicStyles.getValue(x))));
     this.translateService.get("Choose").subscribe(value=> this.allTitle = value);
  }

  ngOnInit() {
    this.band = this.editService.baseModel as Band;
    this.updateInfoItems();
  }

  private updateInfoItems() {
    this.newBand = Object.create(this.band);

    var stylesItem = new InfoItem();
    stylesItem.propertyTitle = "Musician_Styles";
    var stylesValue: string = "";
    if (this.band.styles && this.band.styles.length > 0) {
      this.translateService.get(this.band.styles.map(style => this.musicianTypesProvider.musicStyles.getValue(style))).subscribe(translated => {
        this.band.styles.forEach(style => {
          stylesValue += `${translated[this.musicianTypesProvider.musicStyles.getValue(style)]} `;
        });
         stylesItem.propertyValue = stylesValue;
      });
    }


    stylesItem.propertyValue = stylesValue;
    stylesItem.propertyEditTemplate = this.stylesEditTemplate;

    var descriptionItem = new InfoItem();
    descriptionItem.propertyTitle = "Musician_Description";
    descriptionItem.propertyValue = this.band.description;
    descriptionItem.propertyEditTemplate = this.descriptionEditTemplate;

    this.infoItems = [
      stylesItem,
      descriptionItem
    ]
  }

  private refreshBand(login: string) {
      this.band = this.newBand;
      this.updateInfoItems();
      this.editService.baseModel = this.newBand;
  }

  save() {
    this.newBand.login = this.band.login;
    this.bandService.updateBand(this.newBand).subscribe(x => {
      this.refreshBand(this.band.login);
    })
  }

  cancel() {
    this.refreshBand(this.band.login);
    this.newBand = Object.create(this.band);
  }

}
