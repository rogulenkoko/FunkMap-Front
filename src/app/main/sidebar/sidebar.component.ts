import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from "../user/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SignalrService } from "app/tools/signalr/signalr.service";
import { MessengerService } from "app/main/messenger/messenger.service";
import { Dialog, Message, DialogsNewMessagesCountModel } from "app/main/messenger/models";
import { Subscription } from "rxjs/Subscription";
import { SidebarItem } from 'app/main/sidebar/sidebar-item';
import { DialogReadModel } from 'app/main/messenger/models/dialog-read-model';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @ViewChild("messageCountTemplate") messageCountTemplate;

  private topItems: Array<SidebarItem>;
  private bottomItems: Array<SidebarItem>;

  private dialogsCountModels: Array<DialogsNewMessagesCountModel>;

  private subscription: Subscription;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private messengerService: MessengerService,
              private router: Router) {
    this.subscription = new Subscription();
    this.subscription.add(this.messengerService.onMessageRecieved.subscribe((message)=> this.onMessageRecieved(message)));
    this.subscription.add(this.messengerService.onDialogRead.subscribe(dialogRead=> this.onDialogRead(dialogRead)));
    
  }

  ngOnInit() {
    this.getNewMessagesCount();

    this.initItems();

    this.onRouteChanged(this.router.url);
    this.router.events.subscribe((value:any) => this.onRouteChanged(value.url));

    this.userService.onUserChanged.subscribe(() => this.getNewMessagesCount());
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private initItems(){
    var searchItem = new SidebarItem("search", "Search", "search-icon");
    
        var profileItem = new SidebarItem("profile", "Profile", "person-icon");
        profileItem.visibleForLogged = true;
    
        var messagesItem = new SidebarItem("messenger", "Messages", "messenger-icon");
        messagesItem.rightTemplate = this.messageCountTemplate;
        messagesItem.visibleForLogged = true;
    
        var logoutItem = new SidebarItem("", "Logout", "exit-icon");
        logoutItem.clickEvent = () => this.logOut();
        logoutItem.visibleForLogged = true;
    
        var favouriteItem = new SidebarItem("favorites", "Favorites", "star-icon");
        favouriteItem.visibleForLogged = true;
    
        var settingsItem = new SidebarItem("settings", "Settings", "settings-icon");
        
        var aboutItem = new SidebarItem("about", "About", "logo-icon");
    
        this.topItems = [
          searchItem,
          profileItem,
          messagesItem,
          favouriteItem
        ]
    
        this.bottomItems = [
          settingsItem,
          aboutItem,
          logoutItem
        ];
  }

  private onItemClick(item: SidebarItem) {
    if (item.clickEvent) {
      item.clickEvent();
    }

    var allItems = this.bottomItems.concat(this.topItems);
    allItems.forEach(item => {
      item.isSelected = false;
    });
    item.isSelected = !item.isSelected;
  }

  private getNewMessagesCount() {
    if (!this.userService.user) return;

    this.messengerService.getDialogsWithNewMessagesCount().subscribe(dialogsCountModels => {
      this.dialogsCountModels = dialogsCountModels;
    });
  }

  private onMessageRecieved(message: Message) {

    if(message.sender == this.userService.user.login) return;

    var updatedDialogCountModel = this.dialogsCountModels.find(x=>x.dialogId == message.dialogId);
    if(updatedDialogCountModel){
      updatedDialogCountModel.newMessagesCount ++;
    } else if(message.isNew) {
      var newDialogCountModel = new DialogsNewMessagesCountModel(message.dialogId, 1);
      this.dialogsCountModels.push(newDialogCountModel);
    }
  }

  private onDialogRead(dialogRead: DialogReadModel){
    if(dialogRead.userWhoRead != this.userService.user.login) return;
    this.dialogsCountModels = this.dialogsCountModels.filter(x=>x.dialogId != dialogRead.dialogId);
  }


  logOut() {
    this.userService.user = undefined;
  }

  private onRouteChanged(url: string){
    var item = this.topItems.concat(this.bottomItems).find(x=> x.route != "" && url.includes(x.route));
    if(item){
      this.onItemClick(item);
    }
  }

}


