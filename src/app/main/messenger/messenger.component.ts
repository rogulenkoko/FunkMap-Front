import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessengerServiceHttp, MessengerService } from "app/main/messenger/messenger.service";
import { Dialog, DialogsRequest } from "app/main/messenger/models";
import { DialogService } from 'app/main/messenger/dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateDialogRequest } from 'app/main/messenger/models/create-dialog-request';
import { UserService } from 'app/main/user/user.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit, OnDestroy {

  constructor(private dialogService: DialogService,
              private messengerService: MessengerService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
    this.route.params.subscribe(params => this.onRoute(params));
   }

  ngOnInit() {

  }

  ngOnDestroy(){
    this.setDialog(undefined);
  }

  private onRoute(params: any){
    var dialogId = params["dialogId"] as string;
    if(dialogId){
      var dialog = this.dialogService.dialogs.find(x=>x.dialogId == dialogId);
      if(!dialog){
        this.router.navigate(["/messenger"]);
      }
      this.setDialog(dialog);
    }

    var user = params["user"] as string;

    if(user){
      var expectedDialogs = this.dialogService.dialogs.filter(x=>x.participants.length == 2 && x.participants.find(x=>x == this.userService.user.login) && x.participants.find(x=> x == user));

      if(expectedDialogs && expectedDialogs.length == 1){
        var expectedDialog = expectedDialogs[0];
        this.router.navigate(["/messenger", {dialogId: expectedDialog.dialogId}]);
      } else {
        this.createDialog(user);
      }
    }
  }

  private setDialog(dialog: Dialog) {
    this.dialogService.setDialog(dialog);
    var dialogId = dialog ? dialog.dialogId : undefined;
    this.messengerService.setOpenedDialog(dialogId).subscribe(response => {
      if (!response.success) alert("set dialog failed");
    });
  }

  private createDialog(user: string){
    var request = new CreateDialogRequest([user, this.userService.user.login]);

    this.messengerService.createDialog(request).subscribe(response=>{

    })
  }

}
