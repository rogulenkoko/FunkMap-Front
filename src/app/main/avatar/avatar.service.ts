import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AvatarService {

  public onImageUploaded: EventEmitter<string>;
  public image: string;
  public previousImage: string;
  public onClosed: EventEmitter<any>;

  constructor() { 
    this.onImageUploaded = new EventEmitter<string>();
    this.onClosed = new EventEmitter();
    this.onImageUploaded.subscribe(image=>{
      this.image = image;
    })
  }

}
