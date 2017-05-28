import { Injectable } from '@angular/core';
import { MusicianService } from "./musician.service";

@Injectable()
export class MusicianServiceStub extends MusicianService {

  constructor() { 
    super();
  }

}
