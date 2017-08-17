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

  private musician: Musician;
  private marker: Marker;

  constructor(private mapCreationService: MapCreationService,
              private iconProvider: IconProvider,
              private musicianService: MusicianService,
              private editService: EditService) { 
    this.musician = this.editService.baseModel as Musician;
    this.editService.onSaved.subscribe(()=> this.updateMap());
  }

  ngOnInit() {
    
    this.marker = this.buildMarker();
  }

  private buildMarker():Marker{
    var marker = new Marker(this.musician.login, this.musician.latitude, this.musician.longitude, EntityType.Musician);
    marker.instrument = this.musician.instrument;
    marker.iconUrl = this.iconProvider.getIcon(marker);
    return marker;
  }

  private updateMap(){
    
    this.musician = this.editService.baseModel as Musician;
    if(this.marker.instrument == this.musician.instrument) return;
    var marker = this.buildMarker();
    this.entityMap.initMap(marker);
  }

  private onBaseSaved(){
    var musician = new Musician();
    musician.login = this.editService.baseModel.login;
    musician.latitude = this.editService.baseModel.latitude;
    musician.longitude = this.editService.baseModel.longitude;
    this.musicianService.updateMusician(musician).subscribe(response => {
      
    });
  }
}
