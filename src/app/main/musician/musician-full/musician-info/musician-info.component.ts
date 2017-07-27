import { Component, OnInit, Input } from '@angular/core';
import { Musician } from "app/main/musician/models";
import { InfoItem } from "app/tools/entity-full/entity-info/entity-info.component";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";

@Component({
  selector: 'musician-info',
  templateUrl: './musician-info.component.html',
  styleUrls: ['./musician-info.component.scss']
})
export class MusicianInfoComponent implements OnInit {

  @Input() musician: Musician;

  private infoItems: Array<InfoItem>;

  constructor(private musicianTypesProvider: MusicianTypesProvider) { }

  ngOnInit() {

    var sexItem = new InfoItem();
    sexItem.propertyTitle = "Musician_Sex";
    sexItem.propertyValue = this.musicianTypesProvider.sexTypes.getValue(this.musician.sex);

    var stylesItem = new InfoItem();
    stylesItem.propertyTitle = "Musician_Styles";
    var stylesValue: string = "";
    this.musician.styles.forEach(style => {
      stylesValue += `${this.musicianTypesProvider.musicStyles.getValue(style)} `;
    });
    stylesItem.propertyValue = stylesValue;


    var instrumentItem = new InfoItem();
    instrumentItem.propertyTitle = "Musician_Instrument";
    instrumentItem.propertyValue = this.musicianTypesProvider.instruments.getValue(this.musician.instrument);

    var expirienceItem = new InfoItem();
    expirienceItem.propertyTitle = "Musician_Expirience";
    expirienceItem.propertyValue = this.musicianTypesProvider.expiriences.getValue(this.musician.expirience);

    var descriptionItem = new InfoItem();
    descriptionItem.propertyTitle = "Musician_Description";
    descriptionItem.propertyValue = this.musician.description;

    console.log(this.musician);

    this.infoItems = [
      sexItem,
      instrumentItem,
      expirienceItem,
      stylesItem,
      descriptionItem
    ]
  }

}
