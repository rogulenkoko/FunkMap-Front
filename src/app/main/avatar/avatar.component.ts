import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { UserDataService } from "../user/user-data.service";
import { SaveImageRequest } from "../user/save-image-request";
import { UserService } from "../user/user.service";
import { FileUpload } from "primeng/primeng";
import { CropperDirective } from "app/tools/cropper/cropper.directive";
import { AvatarService } from "app/main/avatar/avatar.service";

@Component({
  selector: 'avatar-edit',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, AfterViewInit  {

  private imageBase64: string = "";
  private isImageLoaded: boolean;
  private wantsToDelete: boolean;

  @ViewChild(CropperDirective) cropper: CropperDirective;

  constructor(private userDataService: UserDataService, 
              private userService: UserService,
              private router: Router,
              private avatarService: AvatarService) {

  }

  ngOnInit() {
    if(!this.avatarService.onImageUploaded.observers || this.avatarService.onImageUploaded.observers.length == 0){
      this.router.navigate(['/']);
    }
  }

  ngAfterViewInit(){
  }

  handleUpdate($event){

  }

  private onImagepload(obj: any){
    if(!obj || !obj.files || obj.files.length == 0) return;
    var file = obj.files[0];
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    var that = this;

    fileReader.onloadend = ()=>{
      this.imageBase64 = fileReader.result;
      this.isImageLoaded = true;
      setTimeout(function() {
        that.cropper.refresh();  
      }, 10);
      
    }
  }

  save(){
    var avatar = this.cropper.getBase64().replace("data:image/png;base64,","");
    this.avatarService.onImageUploaded.emit(avatar);
    
  }

  delete(){
    this.avatarService.onImageUploaded.emit("");
    this.avatarService.previousImage = "";
  }

  cancel(){
    this.isImageLoaded = false;
    this.imageBase64 = undefined;
    this.wantsToDelete = false;
    this.avatarService.previousImage = "";
    if(this.cropper) this.cropper.remove();
  }

  private checkWantsToDelete(){
    this.wantsToDelete = true;
  }

  private onClosed(){
     this.avatarService.previousImage = "";
     this.avatarService.onClosed.emit();
  }

}
