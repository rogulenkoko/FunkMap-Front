import { Component, OnInit } from '@angular/core';
import { MapProvider } from "app/main/map/map-provider.service";
import { Map, EntityType } from "app/main/map/models";
import { SearchFilterService } from "app/main/search/search-filter/search-filter.service";
import { Router } from "@angular/router";
import { MapBuilder } from 'app/main/map/map-builder.service';

@Component({
  selector: 'start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  private map: L.Map;
  private baseLayer: L.TileLayer;

  private items: Array<StartPageItem>;

  constructor(private mapBuilder: MapBuilder,
              private searchFilterService: SearchFilterService,
              private router: Router) { }

  ngOnInit() {
    this.map = this.mapBuilder.buildMap("map", new L.LatLng(30, 10), 0);
    // this.map = new L.Map('map', { center: , zoom: 0, zoomAnimation: false, zoomControl: false });
    // this.baseLayer = new L.TileLayer(this.mapProvider.selectedMap.url, this.buildMapOptions(this.mapProvider.selectedMap));
    // this.map.addLayer(this.baseLayer);


    this.items = [
      new StartPageItem("icon-musician-start", "Start_Musician", EntityType.Musician),
      new StartPageItem("icon-band-start", "Start_Band", EntityType.Band),
       new StartPageItem("icon-studio-start", "Start_Studio", EntityType.Studio),
      new StartPageItem("icon-shop-start", "Start_Shop", EntityType.Shop),
      new StartPageItem("icon-rehearsal-start", "Start_Rehearsal", EntityType.RehearsalPoint)
    ];
  }


  onItemSelected(type: EntityType){
    this.searchFilterService.selectedEntity = type;
    this.searchFilterService.isFilterEnabled = true;
    this.searchFilterService.isFilterClear = false;
    this.router.navigate(['/search']);
  }

  private buildMapOptions(map: Map): any {
    let options: any;
    if (map.subdomains.length == 0) {
      options = {
        attribution: map.attribution,
        maxZoom: map.maxZoom,
        minZoom: 3
      };
    }
    else {
      options = {
        attribution: map.attribution,
        maxZoom: map.maxZoom,
        subdomains: map.subdomains,
        minZoom: 3
      };
    }
    return options;
  }

}

export class StartPageItem{
  constructor(public iconClass: string, public title: string, public type: EntityType){

  }
}
