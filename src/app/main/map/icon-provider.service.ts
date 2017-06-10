import { Injectable } from '@angular/core';
import { InstrumentType } from "../musician/models";
import { Dictionary } from "typescript-collections";
import { Marker, EntityType } from "./models";


@Injectable()
export class IconProvider {

  private icons: Dictionary<InstrumentType, string>;

  constructor() {
    this.icons = new Dictionary<InstrumentType, string>();
    this.icons.setValue(InstrumentType.Bass, "assets/images/markers/bass.png");
    this.icons.setValue(InstrumentType.Drums, "assets/images/markers/drum.png");
    this.icons.setValue(InstrumentType.Vocal, "assets/images/markers/vocal.png");
    this.icons.setValue(InstrumentType.Brass, "assets/images/markers/brass.png");
    this.icons.setValue(InstrumentType.Keyboard, "assets/images/markers/keyboard.png");
    this.icons.setValue(InstrumentType.Guitar, "assets/images/markers/guitar.png");

  }

  public getIcon(point: Marker): string {


    switch (point.entityType) {
      case EntityType.Musician:
        return this.getMusicianIcon(point.instrument);
      case EntityType.Shop:
        return this.getShopIcon();
      case EntityType.Band:
        return this.getBandIcon();
    }
  }

  private getMusicianIcon(type: InstrumentType): string {
    return this.icons.getValue(type);
  }

  private getShopIcon(): string {
    return "assets/images/markers/shop.png";
  }

  private getBandIcon(): string{
    return "assets/images/markers/band.png";
  }

}
