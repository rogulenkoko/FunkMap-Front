import { Component, OnInit } from '@angular/core';
import { Dictionary } from 'typescript-collections';
import { EntityType } from 'app/main/map/models';
import { EntityTypeProvider } from 'app/tools/entity-type-provider.service';
import { IconProvider } from 'app/main/map/icon-provider.service';

@Component({
  selector: 'map-legend',
  templateUrl: './map-legend.component.html',
  styleUrls: ['./map-legend.component.scss']
})
export class MapLegendComponent implements OnInit {

  private legendItemsVisible: boolean = true;

  constructor(private entityTypeProvider: EntityTypeProvider,
              private iconProvider: IconProvider) {
   }

  ngOnInit() {
  }

  showLegendItems(){
    this.legendItemsVisible = !this.legendItemsVisible;
  }

}
