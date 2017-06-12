import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { UserDataService } from "../user/user-data.service";
import { SaveImageRequest } from "../user/save-image-request";
import { UserService } from "../user/user.service";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @ViewChild('cropper') cropper:ImageCropperComponent;

  data: any;
  cropperSettings: CropperSettings;

  constructor(private userDataService: UserDataService, 
              private userService: UserService,
              private router: Router) {

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.rounded = true;
    this.cropperSettings.noFileInput = true;

    this.data = {};

  }

  ngOnInit() {
    this.userDataService.getImage(this.userService.user.login).subscribe(image=>{
      
    })
  }

  save(){
    var request = new SaveImageRequest(this.userService.user.login, this.data.image.replace("data:image/jpeg;base64,",""));
    this.userDataService.saveImage(request).subscribe(response=>{
      if(response.success){
        this.userService.onUserChanged.emit();
        this.router.navigate(["/"]);
      }
    })
  }

  fileChangeListener($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }

}
