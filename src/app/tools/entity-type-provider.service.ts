import { Injectable } from '@angular/core';
import { Entity } from "app/tools/models/entity";
import { EntityType } from "app/main/map/models";

@Injectable()
export class EntityTypeProvider {

  public readonly availableEntities: Array<Entity>;

  constructor() {
    this.availableEntities = [
      new Entity(EntityType.Musician, "Musician"),
      new Entity(EntityType.Shop, "Shop"),
      new Entity(EntityType.Band, "Band"),
      new Entity(EntityType.Studio, "Studio"),
      new Entity(EntityType.RehearsalPoint, "RehearsalPoint"),
    ];
   }

}
