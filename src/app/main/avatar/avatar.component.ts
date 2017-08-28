import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from "@angular/router";
import { UserDataService } from "../user/user-data.service";
import { SaveImageRequest } from "../user/save-image-request";
import { UserService } from "../user/user.service";

import { CroppieOptions } from 'croppie';
import { CroppieDirective } from 'angular-croppie-module';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, AfterViewInit  {

  private imageBase64: string = "asd";

  private isImageLoaded: boolean;

  private croppieOptions: CroppieOptions;

  @ViewChild('croppie') croppie:CroppieDirective;

  constructor(private userDataService: UserDataService, 
              private userService: UserService,
              private router: Router) {
    this.croppieOptions = {
      boundary: { width: 416, height: 280 },
      viewport: { width: 200, height: 200, type: 'circle' },
      showZoomer: false,
      enableOrientation: false,
      enforceBoundary: true
    }

  }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    
    console.log(this.croppie);
    this.croppie.croppie.bind({
      useCanvas:false,
      url:"https://pp.userapi.com/c836437/v836437592/409c2/OHfaablLDbo.jpg",

    }).then(res=>{
      this.isImageLoaded = true;
      window.opener.postMessage(res, '*')
    })
  }

  handleUpdate($event){
    console.log($event);
  }

  save(){
    var request = new SaveImageRequest(this.userService.user.login, "");
    this.userDataService.saveImage(request).subscribe(response=>{
      if(response.success){
        this.userService.onUserChanged.emit();
        this.router.navigate(["/"]);
      }
    })
  }

}
