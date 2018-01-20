import { Component, OnInit, Input } from '@angular/core';
import { Message } from "app/main/messenger/models";
import { UserService } from "app/main/user/user.service";
import { ImageContent, FileContent } from 'app/main/messenger/models/message';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: Message;
  private images: Array<ImageContent>;
  private files: Array<FileContent>;

  private imageViewMode: boolean = false;
  private imageIndex: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit() {
    if(this.message.content && this.message.content.length > 0){
      this.images = this.message.content.filter(x=> x instanceof ImageContent).map(x=> x as ImageContent);
      this.setImagesSize();
      this.files = this.message.content.filter(x=> x instanceof FileContent);
    }
  }

  private setImagesSize(){
    this.images.forEach(image=>{
      var virtualImage = new Image();

      virtualImage.onload = ()=>{
        
        image.width = virtualImage.width;
        image.height = virtualImage.height;
      }
      virtualImage.src = image.dataUrl;
    });
  }

  private showImages(selectedIndex: number){
    this.imageIndex = selectedIndex;
    this.imageViewMode = true;
  }

}
