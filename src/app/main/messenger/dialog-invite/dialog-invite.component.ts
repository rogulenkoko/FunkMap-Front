import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from 'app/main/user/user';
import { UserDataService } from 'app/main/user/user-data.service';
import { Dialog } from 'app/main/messenger/models';
import { DialogService } from 'app/main/messenger/dialog.service';
import { MessengerService } from 'app/main/messenger/messenger.service';

@Component({
  selector: 'dialog-invite',
  templateUrl: './dialog-invite.component.html',
  styleUrls: ['./dialog-invite.component.scss']
})
export class DialogInviteComponent implements OnInit {

  private isVisible: boolean;

  @Input() get visible(): boolean{
    return this.isVisible;
  }

  set visible(value: boolean){
    this.isVisible = value;
  }

  @Output() visibleChange: EventEmitter<boolean>;

  private search: string;
  private newUser: User;

  private addedUsers: Array<User> = [];

  private isNewDialog: boolean;
  private dialogName: string;

  private creationStep: number = 1;

  constructor(private userDataService: UserDataService,
              private dialogService: DialogService,
            private messengerService: MessengerService) {
    this.visibleChange = new EventEmitter<boolean>();
   }

  ngOnInit() {
    this.init();
  }

  private init(){
    this.isNewDialog = this.dialogService.dialog.participants.length <= 2;
  }

  private searchUser() {
    if (!this.search) {
      this.newUser = undefined;
      return;
    }
    this.userDataService.getUser(this.search).subscribe(response => {
      if (response.isExist) {
        this.newUser = response.user;
      } else {
        this.newUser = undefined;
      }
    });
  }

  private finish() {
    if (this.addedUsers.length == 0) {
      this.clear();
      return;
    }
    var dialog = new Dialog();
    dialog.participants = this.addedUsers.map(x => x.login).concat(this.dialogService.dialog.participants);

    if (this.isNewDialog) {
      dialog.name = this.dialogName;
      this.messengerService.createDialog(dialog).subscribe(response => {
        if (response.isSuccess) {
          this.dialogService.setDialog(response.dialog);
          console.log(response.dialog); 
          this.clear();
        }
      })
    } else {
      dialog.dialogId = this.dialogService.dialog.dialogId;
      this.messengerService.updateDialog(dialog).subscribe(response=>{
        this.dialogService.setDialog(response.dialog);       
        console.log(response.dialog); 
        this.clear();
      })
    }
  }

  private addUser(user: User) {
    if (this.addedUsers.find(x => x.login == user.login) || this.dialogService.dialog.participants.find(x => x == user.login)) {
      return;
    }
    this.newUser = undefined;
    this.addedUsers.push(user);
    this.search = "";
  }

  private removeUser(user: User) {
    if (this.addedUsers.find(x => x.login == user.login)) {
      this.addedUsers.splice(this.addedUsers.findIndex(x => x.login == user.login), 1);
    }
  }

  private move(){
    this.creationStep ++;
  }


  private onHide(){
    this.clear();
  }

  private cancel(){
    this.clear();
  }

  private clear(){
    this.isVisible = false;
    this.visibleChange.emit(this.isVisible);
    this.search = "";
    this.newUser = undefined;
    this.addedUsers = [];
    this.creationStep = 1;
  }
}
