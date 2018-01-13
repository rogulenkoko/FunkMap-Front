import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { User } from 'app/main/user/user';
import { UserDataService } from 'app/main/user/user-data.service';
import { Dialog } from 'app/main/messenger/models';
import { DialogService } from 'app/main/messenger/dialog.service';
import { MessengerService } from 'app/main/messenger/messenger.service';
import { InviteParticipantsRequest } from 'app/main/messenger/models/invite-participants-request';
import { Subscription } from 'rxjs/Subscription';
import { DialogType } from 'app/main/messenger/models/dialog';

@Component({
  selector: 'dialog-invite',
  templateUrl: './dialog-invite.component.html',
  styleUrls: ['./dialog-invite.component.scss']
})
export class DialogInviteComponent implements OnInit, OnDestroy {

  private isVisible: boolean;

  @Input() get visible(): boolean{
    return this.isVisible;
  }

  set visible(value: boolean){
    this.isVisible = value;
  }

  @Output() visibleChange: EventEmitter<boolean>;

  @Input() creationMode: boolean;

  private search: string;
  private newUser: User;

  private addedUsers: Array<User> = [];

  private isNewDialog: boolean;
  private dialogName: string;

  private creationStep: number = 1;
  private isError: boolean;

  constructor(private userDataService: UserDataService,
              private dialogService: DialogService,
            private messengerService: MessengerService) {
    this.visibleChange = new EventEmitter<boolean>();
   }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy(){
  }

  private init(){

    if(this.creationMode){
      this.isNewDialog = true;
    } else {
      this.isNewDialog = !this.dialogService.dialog || this.dialogService.dialog.dialogType == DialogType.Base;
    }

    
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

    if(this.creationMode){
      dialog.participants = this.addedUsers.map(x=>x.login);
    } else {
      dialog.participants = this.addedUsers.map(x => x.login).concat(this.dialogService.dialog.participants);
    }
    

    if (this.isNewDialog) {
      dialog.name = this.dialogName;
      this.messengerService.createDialog(dialog).subscribe(response => {
        if (response.isSuccess) {
          this.clear();
        } else {
          this.isError = true;
          setTimeout(()=> this.isError = false, 3000);
        }
      })
    } else {
      var request = new InviteParticipantsRequest(this.dialogService.dialog.dialogId, dialog.participants);

      this.messengerService.inviteParticipants(request).subscribe(response=>this.clear());
    }
  }

  private addUser(user: User) {

    if(this.creationMode){
      this.newUser = undefined;
      this.addedUsers.push(user);
      this.search = "";
      return;
    }

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

    if(this.creationMode && this.addedUsers && this.addedUsers.length == 1){
      this.finish();
      return;
    }

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
