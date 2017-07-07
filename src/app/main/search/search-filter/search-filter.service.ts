import { Injectable } from '@angular/core';
import { MusicStyle, InstrumentType, ExpirienceType } from "app/main/musician/models";
import { Entity } from "app/tools/models/entity";

@Injectable()
export class SearchFilterService {

  public styles: Array<MusicStyle>;
  public instruments: Array<InstrumentType>

  constructor() {
    this.styles = [];
    this.instruments = [];
  }



}
