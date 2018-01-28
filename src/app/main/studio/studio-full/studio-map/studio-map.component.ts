import { Component, OnInit, ViewChild } from '@angular/core';
import { Studio } from "app/main/studio/models/studio-preview";
import { EntityType, Marker } from "app/main/map/models";
import { IconProvider } from "app/main/map/icon-provider.service";
import { MapCreationService } from "app/main/map/map-creation.service";
import { EntityMapComponent } from "app/tools/entity-full/entity-map/entity-map.component";
import { EditService } from "app/tools/entity-full/edit.service";
import { StudioService } from "app/main/studio/studio.service";

@Component({
  selector: 'studio-map',
  templateUrl: './studio-map.component.html',
  styleUrls: ['./studio-map.component.scss']
})
export class StudioMapComponent implements OnInit {

  @ViewChild('entityMap') entityMap: EntityMapComponent;

  private studio: Studio;
  public marker: Marker;

  constructor(private mapCreationService: MapCreationService,
              private iconProvider: IconProvider,
              private studioService: StudioService,
              private editService: EditService) { 
    this.studio = this.editService.baseModel as Studio;
  }

  ngOnInit() {
    this.mapCreationService.address = this.studio.address;
    this.marker = this.buildMarker();
  }

  private buildMarker():Marker{
    var marker = new Marker(this.studio.login, this.studio.latitude, this.studio.longitude, EntityType.Studio);
    marker.iconUrl = this.iconProvider.getIcon(marker);
    return marker;
  }

  private onBaseSaved(){
    var studio = new Studio();
    studio.login = this.editService.baseModel.login;
    studio.latitude = this.editService.baseModel.latitude;
    studio.longitude = this.editService.baseModel.longitude;
    studio.address = this.mapCreationService.address;
    this.studioService.updateStudio(studio).subscribe(response => {
      
    });
  }

}
