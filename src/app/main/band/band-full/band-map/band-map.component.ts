import { Component, OnInit, ViewChild } from '@angular/core';
import { EditService } from "app/tools/entity-full/edit.service";
import { EntityMapComponent } from "app/tools/entity-full/entity-map/entity-map.component";
import { Band } from "app/main/band/models";
import { Marker, EntityType } from "app/main/map/models";
import { MapCreationService } from "app/main/map/map-creation.service";
import { IconProvider } from "app/main/map/icon-provider.service";
import { BandService } from "app/main/band/band.service";

@Component({
  selector: 'band-map',
  templateUrl: './band-map.component.html',
  styleUrls: ['./band-map.component.scss']
})
export class BandMapComponent implements OnInit {

  @ViewChild('entityMap') entityMap: EntityMapComponent;

  private band: Band;
  public marker: Marker;

  constructor(private mapCreationService: MapCreationService,
              private iconProvider: IconProvider,
              private bandService: BandService,
              private editService: EditService) { 
    this.band = this.editService.baseModel as Band;
  }

  ngOnInit() {
    this.mapCreationService.address = this.band.address;
    this.marker = this.buildMarker();
  }

  private buildMarker():Marker{
    var marker = new Marker(this.band.login, this.band.latitude, this.band.longitude, EntityType.Band);
    marker.iconUrl = this.iconProvider.getIcon(marker);
    return marker;
  }

  public onBaseSaved(){
    var band = Object.create(this.editService.baseModel);
    band.login = this.editService.baseModel.login;
    band.latitude = this.editService.baseModel.latitude;
    band.longitude = this.editService.baseModel.longitude;
    band.address = this.mapCreationService.address;


    this.bandService.updateBand(band).subscribe(response => {
      
    });
  }

}
