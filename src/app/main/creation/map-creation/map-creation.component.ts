import { Component, OnInit } from '@angular/core';
import { MapProvider } from "../../map/map-provider.service";
import { Map, Marker, EntityType } from "../../map/models";
import { IconProvider } from "../../map/icon-provider.service";
import { MarkerFactory } from "../../map/marker-factory.service";
import { CreationService } from "../creation.service";
import { Router, Params, ActivatedRoute } from "@angular/router";
import { CreationResponse } from "../creation";
import { UserService } from "app/main/user/user.service";
import { MapCreationService } from "app/main/map/map-creation.service";

@Component({
  selector: 'app-map-creation',
  templateUrl: './map-creation.component.html',
  styleUrls: ['./map-creation.component.scss']
})
export class MapCreationComponent implements OnInit {

  private isNotToSave: boolean;

  constructor(private mapProvider: MapProvider,
    private mapCreationService: MapCreationService,
    private iconProvider: IconProvider,
    private markerFactory: MarkerFactory,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.isNotToSave = true;
    this.route.params.subscribe(params => {
      if (params["save"]) {
        this.isNotToSave = false;
        //this.save();
      }
    });
  }

  useCurrentPosition() {
    this.mapCreationService.onComplete.emit(this.mapCreationService.marker);
  }

  useCustomPosition() {
    this.mapCreationService.onSelectPosition.emit(this.mapCreationService.marker);
    this.router.navigate(['/']);

  }
}
