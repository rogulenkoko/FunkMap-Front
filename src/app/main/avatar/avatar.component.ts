import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from "@angular/router";
import { UserDataService } from "../user/user-data.service";
import { SaveImageRequest } from "../user/save-image-request";
import { UserService } from "../user/user.service";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, AfterViewInit  {

  private imageBase64: string = "";

  private isImageLoaded: boolean;

  constructor(private userDataService: UserDataService, 
              private userService: UserService,
              private router: Router) {

  }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    
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
