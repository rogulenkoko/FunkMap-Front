import { Component, OnInit, Input } from '@angular/core';
import { Dialog } from "app/main/messenger/models";
import { DialogService } from "app/main/messenger/dialog.service";
import { UserService } from "app/main/user/user.service";
import { UserDataService } from "app/main/user/user-data.service";

@Component({
  selector: 'dialog-item',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input() dialog: Dialog;

  constructor(private dialogService: DialogService,
              private userService: UserService,
              private userDataService: UserDataService) {
   }

  ngOnInit() {
    if(this.userService.user.login && this.dialog.participants && this.dialog.participants.length == 2){
      var login = this.dialog.participants.filter(x=>x != this.userService.user.login)[0];
      this.userDataService.getImage(login).subscribe(image=>{
        this.dialog.avatar = image;
      })
    }
  }

}
