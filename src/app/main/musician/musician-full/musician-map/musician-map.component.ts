import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Musician } from "app/main/musician/models";
import { Marker, EntityType } from "app/main/map/models";
import { MapCreationService } from "app/main/map/map-creation.service";
import { IconProvider } from "app/main/map/icon-provider.service";
import { MusicianService } from "app/main/musician/musician.service";
import { EditService } from "app/tools/entity-full/edit.service";
import { EntityMapComponent } from "app/tools/entity-full/entity-map/entity-map.component";

@Component({
  selector: 'musician-map',
  templateUrl: './musician-map.component.html',
  styleUrls: ['./musician-map.component.scss']
})
export class MusicianMapComponent implements OnInit {

  @ViewChild('entityMap') entityMap: EntityMapComponent;

  public musician: Musician;
  public marker: Marker;

  constructor(private mapCreationService: MapCreationService,
              private iconProvider: IconProvider,
              private musicianService: MusicianService,
              private editService: EditService) { 
    this.musician = this.editService.baseModel as Musician;
    //this.editService.onSaved.subscribe(()=> this.updateMap());
  }

  ngOnInit() {
    this.mapCreationService.address = this.musician.address;
    this.marker = this.buildMarker();
  }

  private buildMarker():Marker{
    var marker = new Marker(this.musician.login, this.musician.latitude, this.musician.longitude, EntityType.Musician);
    marker.instrument = this.musician.instrument;
    marker.iconUrl = this.iconProvider.getIcon(marker);
    return marker;
  }

  //нужно если у одного типа профиля будет несколько видов маркеров
  // private updateMap(){
  //   this.musician = this.editService.baseModel as Musician;
  //   if(this.marker.instrument == this.musician.instrument) return;
  //   var marker = this.buildMarker();
  //   this.entityMap.marker = marker;
  //   this.entityMap.initMap(marker);
  // }

  public onBaseSaved(){
    var musician = Object.create(this.editService.baseModel);
    musician.login = this.editService.baseModel.login;
    musician.latitude = this.editService.baseModel.latitude;
    musician.longitude = this.editService.baseModel.longitude;
    musician.address = this.mapCreationService.address;

    this.musicianService.updateMusician(musician).subscribe(response => {
      
    });
  }
}
