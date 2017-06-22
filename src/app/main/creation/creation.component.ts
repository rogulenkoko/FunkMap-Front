import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { InstrumentType, Musician, MusicStyle, Sex } from "../musician/models";
import { DateSelectProvider } from "app/tools/date/date-select-provider.service";
import { MusicianTypesProvider } from "../musician/musician-types-provider";
import { EntityType } from "../map/models";
import { CreationService } from "./creation.service";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})

export class CreationComponent implements OnInit {

  private availableEntities: Array<Entity>;
  private selectedEntity: Entity;

  constructor(private creationService: CreationService,
              private router: Router) {
    this.availableEntities = [
      new Entity(EntityType.Musician, "Musician"),
      new Entity(EntityType.Shop, "Shop"),
    ];
    this.selectedEntity = this.availableEntities[0];
   }

  ngOnInit(){
  }

  save(){
    this.router.navigate(['/checkmap']);
  }

}

export class Entity{
  constructor(public type: EntityType, public title: string){

  }
}
