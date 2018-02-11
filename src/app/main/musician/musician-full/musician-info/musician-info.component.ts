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
import { SearchItem } from 'app/main/search/search-item';
import { SearchService } from 'app/main/search/search.service';
import { BaseService } from 'app/tools/base.service';
import { LeaveBandRequest } from 'app/main/band/models/leave-band-request';

@Component({
  selector: 'musician-info',
  templateUrl: './musician-info.component.html',
  styleUrls: ['./musician-info.component.scss']
})
export class MusicianInfoComponent implements OnInit, OnDestroy {

  public musician: Musician;
  public newMusician: Musician;



  public styles: Array<StylesItem>;
  public instruments: Array<InstrumentsItem>;
  public expiriences: Array<ExpirienceItem>;

  @ViewChild("dateTemplate") dateTemplate: any;
  @ViewChild("bandsTemplate") bandsTemplate: any;

  @ViewChild("instrumentEditTemplate") instrumentEditTemplate: any;
  @ViewChild("sexEditTemplate") sexEditTemplate: any;
  @ViewChild("expirienceEditTeplate") expirienceEditTeplate: any;
  @ViewChild("descriptionEditTemplate") descriptionEditTemplate: any;
  @ViewChild("dateEditTemplate") dateEditTemplate: any;
  @ViewChild("stylesEditTemplate") stylesEditTemplate: any;

  public infoItems: Array<InfoItem>;

  public allTitle: string;

  private subscription: Subscription;

  public bands: Array<SearchItem>;
  public isUsers: boolean;

  public hoveredBandLogin: string;

  constructor(public musicianTypesProvider: MusicianTypesProvider,
              private musicianService: MusicianService,
              private dateProvider: DateSelectProvider,
              private translateService: TranslateService,
              private editService: EditService,
              private baseService: BaseService) {
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
    this.updateBands();
    this.isUsers = this.editService.isUsers;

  }

  ngOnDestroy() {
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

    var bandsItem = new InfoItem();
    bandsItem.propertyTitle = "Musician_Bands";
    bandsItem.propertyTemplate = this.bandsTemplate;


    this.infoItems = [
      birthDateItem,
      sexItem,
      instrumentItem,
      expirienceItem,
      stylesItem,
      bandsItem,
      descriptionItem
    ]
  }

  private updateBands() {
    if (!this.musician || !this.musician.bandLogins || this.musician.bandLogins.length == 0 ){
      this.bands = [];
      return;
    }
    this.baseService.getSpecific(this.musician.bandLogins).subscribe(bands => {
      this.bands = bands;
    });
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
    this.updateBands();
  }

  private leaveBand(bandLogin: string) {
    var request = new LeaveBandRequest(bandLogin, this.musician.login);
    this.musicianService.leaveBand(request).subscribe(response => {
      if (!response.success) return;
      this.musician.bandLogins = this.musician.bandLogins.filter(x => x != bandLogin);
      
      this.updateBands();
    });
  }

  private overBand(login: string){
    this.hoveredBandLogin = login;
  }

}
