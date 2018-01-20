import { Injectable } from '@angular/core';
import { EntityType } from "app/main/map/models";
import { Dictionary } from "typescript-collections";

@Injectable()
export class EntityTypeProvider {

  public entities: Dictionary<EntityType, string>;

  constructor() {
    this.initEntities();
  }

  private initEntities() {
    this.entities = new Dictionary<EntityType, string>();
    this.entities.setValue(EntityType.Musician, "Musician");
    this.entities.setValue(EntityType.Band, "Band");
    this.entities.setValue(EntityType.RehearsalPoint, "RehearsalPoint");
    this.entities.setValue(EntityType.Studio, "Studio");
    this.entities.setValue(EntityType.Shop, "Shop");
  }

}
