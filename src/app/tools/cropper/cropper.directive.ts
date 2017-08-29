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
    $(`#${this.elementId}`).cropper({
      aspectRatio: 1,
      guides: false,
      zoomable: false,
      background: false,
      crop: function (e) {
        //console.log(e);
      }
    })
  }

}
