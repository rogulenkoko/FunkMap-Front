import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AvatarService {

  public onImageUploaded: EventEmitter<string>;

  constructor() { 
    this.onImageUploaded = new EventEmitter<string>();
  }

}
