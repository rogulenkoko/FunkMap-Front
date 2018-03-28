import { Component, OnInit } from '@angular/core';
import { DialogService } from 'app/main/messenger/dialog.service';
import { UserDataService } from 'app/main/user/user-data.service';
import { User } from 'app/main/user/user';
import { MessengerService } from 'app/main/messenger/messenger.service';
import { Dialog } from 'app/main/messenger/models';
import { UserService } from 'app/main/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogUpdateRequest } from 'app/main/messenger/models/dialog-update-request';

@Component({
  selector: 'dialog-bar',
  templateUrl: './dialog-bar.component.html',
  styleUrls: ['./dialog-bar.component.scss']
})
export class DialogBarComponent implements OnInit {


  public userLogin: string;
  public isAddToDialogMode: boolean = false;
  public isVisibleParticipantsList: boolean = false;
  public isEditNameMode: boolean = false;
  public isChangeAvatarMode: boolean = false;

  constructor(public dialogService: DialogService,
    private messengerService: MessengerService,
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.updateDialogLogin();
    
    this.route.params.subscribe(params => this.onRoute(params));
  }

  private onRoute(params: any){
    var dialogId = params["dialogId"] as string;
    if(dialogId){
      this.userLogin = undefined;
      this.updateDialogLogin();
    }
  }

  private updateDialogLogin() {
    if(!this.userService.user) return;
    if (this.userService.user.login && this.dialogService.dialog && this.dialogService.dialog.participants && this.dialogService.dialog.dialogType == 1) {
      this.userLogin = this.dialogService.dialog.participants.filter(x => x != this.userService.user.login)[0];
    }
  }

  private onAvatarSaved(bytes: string){
    var dialog = new DialogUpdateRequest(this.dialogService.dialog.dialogId, this.dialogService.dialog.name, bytes);
    this.messengerService.updateDialog(dialog).subscribe(response=>{
      if(response.isSuccess) this.isChangeAvatarMode = false;
    });
  }

  private addToDialog() {
    this.isAddToDialogMode = true;
  }

  private showList(){
    this.isVisibleParticipantsList = true;
  }

  private changeName(){
    this.isEditNameMode = true;
  }

  private changeAvatar(){
    this.isChangeAvatarMode = true;
  }

  //для мобилки
  private moveToDialogs(){
    this.dialogService.setDialog(undefined);
    this.router.navigate(["/messenger"]);
  }
}
