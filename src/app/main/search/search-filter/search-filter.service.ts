import { Injectable, EventEmitter } from '@angular/core';
import { MusicStyle, InstrumentType, ExpirienceType } from "app/main/musician/models";
import { Entity } from "app/tools/models/entity";

@Injectable()
export class SearchFilterService {

  public searchText: string;

  public styles: Array<MusicStyle>;
  public instruments: Array<InstrumentType>;

  public selectedEntity: Entity;
  public selectedExpirience: ExpirienceType;

  public onFilterChanged: EventEmitter<any>;

  constructor() {
    this.styles = [];
    this.instruments = [];
    this.onFilterChanged = new EventEmitter();
  }



}
