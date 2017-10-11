import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Musician, InstrumentType } from "app/main/musician/models";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";
import { MusicianService } from "app/main/musician/musician.service";
import { IconProvider } from "app/main/map/icon-provider.service";
import { DateSelectProvider } from "app/tools";
import { StylesItem, InstrumentsItem, ExpirienceItem } from "app/tools/select";
import { TranslateService } from "@ngx-translate/core";
import { EditService } from "app/tools/entity-full/edit.service";
import { InfoItem } from 'app/tools/entity-full/info-item';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'musician-info',
  templateUrl: './musician-info.component.html',
  styleUrls: ['./musician-info.component.scss']
})
export class MusicianInfoComponent implements OnInit, OnDestroy {

  private musician: Musician;
  private newMusician: Musician;



  private styles: Array<StylesItem>;
  private instruments: Array<InstrumentsItem>;
  private expiriences: Array<ExpirienceItem>;

  @ViewChild("dateTemplate") dateTemplate: any;

  @ViewChild("instrumentEditTemplate") instrumentEditTemplate: any;
  @ViewChild("sexEditTemplate") sexEditTemplate: any;
  @ViewChild("expirienceEditTeplate") expirienceEditTeplate: any;
  @ViewChild("descriptionEditTemplate") descriptionEditTemplate: any;
  @ViewChild("dateEditTemplate") dateEditTemplate: any;
  @ViewChild("stylesEditTemplate") stylesEditTemplate: any;

  private infoItems: Array<InfoItem>;

  private allTitle: string;

  private subscription: Subscription;

  constructor(private musicianTypesProvider: MusicianTypesProvider,
    private musicianService: MusicianService,
    private dateProvider: DateSelectProvider,
    private translateService: TranslateService,
    private editService: EditService) {
    this.subscription = new Subscription();
    this.styles = musicianTypesProvider.musicStyles.keys().map(x => new StylesItem(x, this.translateService.get(musicianTypesProvider.musicStyles.getValue(x))));
    this.instruments = musicianTypesProvider.instruments.keys().map(x => new InstrumentsItem(x, this.translateService.get(musicianTypesProvider.instruments.getValue(x))));
    this.expiriences = musicianTypesProvider.expiriences.keys().map(x => new ExpirienceItem(x, this.translateService.get(musicianTypesProvider.expiriences.getValue(x))));

    this.musician = this.editService.baseModel as Musician;

    this.translateService.get("Choose").subscribe(value => this.allTitle = value);
    this.subscription.add(this.editService.onSaved.subscribe((musician) => this.onChanged(musician)));
  }

  ngOnInit() {
    this.updateInfoItems();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private updateInfoItems() {
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

    if (this.musician.styles && this.musician.styles.length != 0) {
      this.translateService.get(this.musician.styles.map(style => this.musicianTypesProvider.musicStyles.getValue(style))).subscribe(translated => {
        this.musician.styles.forEach(style => {
          stylesValue += `${translated[this.musicianTypesProvider.musicStyles.getValue(style)]} `;
        });
        stylesItem.propertyValue = stylesValue;
      });
    }


    stylesItem.propertyValue = stylesValue;
    stylesItem.propertyEditTemplate = this.stylesEditTemplate;


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

  save() {
    this.newMusician.login = this.musician.login;
    this.newMusician.birthDate = this.dateProvider.buildDate();
    this.musicianService.updateMusician(this.newMusician).subscribe(x => {
      this.musician = this.newMusician;
      this.editService.baseModel = this.newMusician;
      this.updateInfoItems();
    })
  }

  cancel() {
    this.newMusician = Object.create(this.musician);
    this.editService.baseModel = this.newMusician;
    this.updateInfoItems();
  }

  private selectInstrument(instrument: InstrumentType) {
    this.newMusician.instrument = instrument;
  }

  private onChanged(musician: Musician) {
    this.musician = musician;
    this.newMusician = Object.create(this.musician);
    this.updateInfoItems();
  }

}
