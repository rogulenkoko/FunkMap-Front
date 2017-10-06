import { Component, OnInit } from '@angular/core';
import { DialogService } from 'app/main/messenger/dialog.service';
import { UserDataService } from 'app/main/user/user-data.service';
import { User } from 'app/main/user/user';
import { MessengerService } from 'app/main/messenger/messenger.service';
import { Dialog } from 'app/main/messenger/models';
import { UserService } from 'app/main/user/user.service';

@Component({
  selector: 'dialog-bar',
  templateUrl: './dialog-bar.component.html',
  styleUrls: ['./dialog-bar.component.scss']
})
export class DialogBarComponent implements OnInit {

  private isAddToDialogMode: boolean = false;
  
  constructor(private dialogService: DialogService,
    private messengerService: MessengerService) { }

  ngOnInit() {
  }

  private addToDialog() {
    this.isAddToDialogMode = true;
    
  }
}
