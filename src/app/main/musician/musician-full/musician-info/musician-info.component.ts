import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Musician, InstrumentType } from "app/main/musician/models";
import { InfoItem } from "app/tools/entity-full/entity-info/entity-info.component";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";
import { MusicianService } from "app/main/musician/musician.service";
import { IconProvider } from "app/main/map/icon-provider.service";
import { DateSelectProvider } from "app/tools";

@Component({
  selector: 'musician-info',
  templateUrl: './musician-info.component.html',
  styleUrls: ['./musician-info.component.scss']
})
export class MusicianInfoComponent implements OnInit {

  @Input() musician: Musician;
  private newMusician: Musician;


  @ViewChild("dateTemplate") dateTemplate: any;

  @ViewChild("instrumentEditTemplate") instrumentEditTemplate: any;
  @ViewChild("sexEditTemplate") sexEditTemplate: any;
  @ViewChild("expirienceEditTeplate") expirienceEditTeplate: any;
  @ViewChild("descriptionEditTemplate") descriptionEditTemplate: any;
  @ViewChild("dateEditTemplate") dateEditTemplate: any;

  private infoItems: Array<InfoItem>;

  constructor(private musicianTypesProvider: MusicianTypesProvider,
              private musicianService: MusicianService,
              private iconProvider: IconProvider,
              private dateProvider: DateSelectProvider) {
  }

  ngOnInit() {

    this.newMusician = Object.create(this.musician);
    this.dateProvider.setDate(this.musician.birthDate);

    var birthDateItem = new InfoItem();
    birthDateItem.propertyTitle = "Musician_BirthDate";
    birthDateItem.propertyTemplate = this.dateTemplate;
    birthDateItem.propertyEditTemplate = this.dateEditTemplate;

    var sexItem = new InfoItem();
    sexItem.propertyTitle = "Musician_Sex";
    sexItem.propertyValue = this.musicianTypesProvider.sexTypes.getValue(this.musician.sex);
    sexItem.propertyEditTemplate = this.sexEditTemplate;

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
    instrumentItem.propertyEditTemplate = this.instrumentEditTemplate;

    var expirienceItem = new InfoItem();
    expirienceItem.propertyTitle = "Musician_Expirience";
    expirienceItem.propertyValue = this.musicianTypesProvider.expiriences.getValue(this.musician.expirience);
    expirienceItem.propertyEditTemplate = this.expirienceEditTeplate;

    var descriptionItem = new InfoItem();
    descriptionItem.propertyTitle = "Musician_Description";
    descriptionItem.propertyValue = this.musician.description;
    descriptionItem.propertyEditTemplate = this.descriptionEditTemplate;

    this.infoItems = [
      birthDateItem,
      sexItem,
      instrumentItem,
      expirienceItem,
      stylesItem,
      descriptionItem
    ]
  }

  private refreshMusician(login: string) {
    this.musicianService.getMusician(login).subscribe(musician => {
      this.musician = musician;
    })
  }

  save(){
    //this.musicianService

    this.newMusician.birthDate = this.dateProvider.buildDate();

    console.log(this.newMusician);
    this.refreshMusician(this.musician.login);
  }

  cancel(){
    console.log("Asda");
    this.refreshMusician(this.musician.login);
  }

  private selectInstrument(instrument: InstrumentType){
    this.newMusician.instrument = instrument;
  }

}
