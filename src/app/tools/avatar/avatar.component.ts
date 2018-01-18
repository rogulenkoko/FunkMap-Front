import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { Router } from "@angular/router";
import { FileUpload } from "primeng/primeng";
import { CropperDirective } from "app/tools/cropper/cropper.directive";
import { UserDataService } from 'app/main/user/user-data.service';
import { UserService } from 'app/main/user/user.service';
import { Dialog } from 'primeng/primeng';

@Component({
  selector: 'avatar-edit',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, AfterViewInit  {

  private imageBase64: string = "";
  private isImageLoaded: boolean;
  private wantsToDelete: boolean;

  private isVisible: boolean;

  @Input() get visible(): boolean{
    return this.isVisible;
  }

  set visible(value: boolean){
    this.isVisible = value;
  }

  @Output() visibleChange: EventEmitter<boolean>;

  @ViewChild(CropperDirective) cropper: CropperDirective;
  @ViewChild(Dialog) dialog: Dialog;

  @Output() onImageUploaded: EventEmitter<string>;

  @Input() previousPhoto: string;

  constructor(private userDataService: UserDataService, 
              private userService: UserService,
              private router: Router) {
    this.onImageUploaded =new EventEmitter<string>();
    this.visibleChange = new EventEmitter();
  }

  ngOnInit() {
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
      this.dialog.positionTop = 110;
      this.dialog.show();
      this.imageBase64 = fileReader.result;
      this.isImageLoaded = true;
      setTimeout(function() {
        that.cropper.refresh();   
      }, 0);
      
    }
  }

  save(){
    var avatar = this.cropper.getBase64().replace("data:image/png;base64,","");
    this.onImageUploaded.emit(avatar);
    this.clear(); 
    
  }

  delete(){
    this.onImageUploaded.emit("");
    this.clear();
  }

  cancel(){
    this.clear();
  }

  private checkWantsToDelete(){
    this.wantsToDelete = true;
  }

  private onClosed(){
    this.clear();
  }

  private clear(){
    this.isImageLoaded = false;
    this.imageBase64 = undefined;
    this.wantsToDelete = false;
    if(this.cropper) this.cropper.remove();
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
