import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FileContent } from 'app/main/messenger/models/message';

@Component({
  selector: 'image-full',
  templateUrl: './image-full.component.html',
  styleUrls: ['./image-full.component.scss']
})
export class ImageFullComponent implements OnInit, AfterViewInit {

  @Input() images: Array<FileContent>;
  @Input() index: number = 0;

  private currentImage: FileContent;

  private isVisible: boolean;

  @Input() get visible(): boolean {
    return this.isVisible;
  }

  set visible(value: boolean) {
    this.isVisible = value;
    this.visibleChange.emit(this.visible);
  }

  @Output() visibleChange: EventEmitter<boolean>;

  constructor() {
    this.visibleChange = new EventEmitter<boolean>();
   }

  ngOnInit() {
    this.setImage(this.index);
  }

  ngAfterViewInit(){
    this.setCrossPosition();
    window.onresize = ()=> this.setCrossPosition();
  }

  private setCrossPosition(){
    if(this.images.length > 1) return;
    var imageWidth = jQuery("#modal-image").width();
    var imageContainerWidth = jQuery("#modal-image-container").width();
    jQuery("#modal-close").css("left",`${(imageWidth + imageContainerWidth)/2 + 18}px`);

    var imageHeight = jQuery("#modal-image").height();
    var imageContainerHeight = jQuery("#modal-image-container").height();
    jQuery("#modal-close").css("top",`${(imageContainerHeight - imageHeight)/2 - 24}px`);
  }

  private setImage(index: number){
    this.index = index;
    this.currentImage = this.images[index];
  }

  private next(value: number){
    var nextIndex = value + this.index;
    
    if(nextIndex == this.images.length){
      nextIndex = 0;
    } else if (nextIndex == -1){
      nextIndex = this.images.length - 1;
    }
    

    this.setImage(nextIndex);
  }

  cancel(){
    this.images = [];
    this.visible = false;
  }

}
