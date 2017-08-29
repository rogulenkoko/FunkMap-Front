import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AvatarService {

  public onImageUploaded: EventEmitter<string>;
  public image: string;

  constructor() { 
    this.onImageUploaded = new EventEmitter<string>();
    this.onImageUploaded.subscribe(image=>{
      this.image = image;
    })
  }

}
