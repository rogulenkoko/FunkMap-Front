import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityMapComponent } from "app/tools/entity-full/entity-map/entity-map.component";
import { MapCreationService } from "app/main/map/map-creation.service";
import { Rehearsal } from "app/main/rehearsal/models/rehearsal-preview";
import { Marker, EntityType } from "app/main/map/models";
import { IconProvider } from "app/main/map/icon-provider.service";
import { RehearsalService } from "app/main/rehearsal/rehearsal.service";
import { EditService } from "app/tools/entity-full/edit.service";

@Component({
  selector: 'rehearsal-map',
  templateUrl: './rehearsal-map.component.html',
  styleUrls: ['./rehearsal-map.component.scss']
})
export class RehearsalMapComponent implements OnInit {

  @ViewChild('entityMap') entityMap: EntityMapComponent;

  private rehearsal: Rehearsal;
  private marker: Marker;

  constructor(private mapCreationService: MapCreationService,
              private iconProvider: IconProvider,
              private rehearsalService: RehearsalService,
              private editService: EditService) { 
    this.rehearsal = this.editService.baseModel as Rehearsal;
  }

  ngOnInit() {
    this.marker = this.buildMarker();
  }

  private buildMarker():Marker{
    var marker = new Marker(this.rehearsal.login, this.rehearsal.latitude, this.rehearsal.longitude, EntityType.RehearsalPoint);
    marker.iconUrl = this.iconProvider.getIcon(marker);
    return marker;
  }

  private onBaseSaved(){
    var band = new Rehearsal();
    band.login = this.editService.baseModel.login;
    band.latitude = this.editService.baseModel.latitude;
    band.longitude = this.editService.baseModel.longitude;
    this.rehearsalService.updateRehearsal(band).subscribe(response => {
      
    });
  }

}
