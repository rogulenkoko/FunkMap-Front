import { Directive, Input, ElementRef, AfterContentInit } from '@angular/core';

declare var $;
declare var Cropper;

@Directive({
  selector: '[cropper]'
})
export class CropperDirective implements AfterContentInit {


  @Input() elementId: string;

  constructor(private _element: ElementRef) {

  }

  ngAfterContentInit() {
  }

  public refresh() {
    $(`#${this.elementId}`).cropper({
      aspectRatio: 1/1,
      guides: false,
      zoomable: false,
      background: false,
      scalable: false,
      crop: function (e) {
        
      }
    });
  }

  public remove(){
    $(`#${this.elementId}`).cropper("destroy");
  }

  public getBase64(): string{
    return $(`#${this.elementId}`).cropper('getCroppedCanvas').toDataURL();
  }

}
