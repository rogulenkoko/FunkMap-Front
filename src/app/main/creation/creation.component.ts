import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { InstrumentType, Musician, MusicStyle, Sex } from "../musician/models";
import { DateSelectProvider } from "app/tools/date/date-select-provider.service";
import { MusicianTypesProvider } from "../musician/musician-types-provider";
import { EntityType } from "../map/models";
import { CreationService } from "./creation.service";
import { Entity } from "app/tools/models/entity";
import { EntityTypeProvider } from "app/tools/entity-type-provider.service";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})

export class CreationComponent implements OnInit {


  constructor(private creationService: CreationService,
              private router: Router,
              private entityTypeProvider: EntityTypeProvider) {
    
    this.creationService.selectedEntity = this.entityTypeProvider.availableEntities[0];
   }

  ngOnInit(){
  }

  save(){
    this.router.navigate(['/checkmap']);
  }
}


