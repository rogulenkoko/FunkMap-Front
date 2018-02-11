import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from "../user/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SignalrService } from "app/tools/signalr/signalr.service";
import { MessengerService } from "app/main/messenger/messenger.service";
import { Dialog, Message, DialogsNewMessagesCountModel } from "app/main/messenger/models";
import { Subscription } from "rxjs/Subscription";
import { SidebarItem } from 'app/main/sidebar/sidebar-item';
import { DialogReadModel } from 'app/main/messenger/models/dialog-read-model';
import { SidebarService } from 'app/main/sidebar/sidebar.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @ViewChild("messageCountTemplate") messageCountTemplate;

  public topItems: Array<SidebarItem>;
  public bottomItems: Array<SidebarItem>;

  private dialogsCountModels: Array<DialogsNewMessagesCountModel>;

  private subscription: Subscription;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private messengerService: MessengerService,
              private router: Router,
              private sidebarService: SidebarService) {
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
    var searchItem = new SidebarItem("search", "Search", "icon-search");
    
        var profileItem = new SidebarItem("profile", "Profile", "icon-no-name");
        profileItem.visibleForLogged = true;
    
        var messagesItem = new SidebarItem("messenger", "Messages", "icon-mail");
        messagesItem.rightTemplate = this.messageCountTemplate;
        messagesItem.visibleForLogged = true;
    
        var logoutItem = new SidebarItem("", "Logout", "icon-logout");
        logoutItem.clickEvent = () => this.logOut();
        logoutItem.visibleForLogged = true;
    
        var favouriteItem = new SidebarItem("favorites", "Favorites", "icon-favorite");
        favouriteItem.visibleForLogged = true;
    
        var settingsItem = new SidebarItem("settings", "Settings", "icon-settings");
        
        var aboutItem = new SidebarItem("about", "About", "icon-logo-symbol");
    
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

  private onItemClick(item: SidebarItem, updateSidebar?: boolean) {
    if (item.clickEvent) {
      item.clickEvent();
    }

    var allItems = this.bottomItems.concat(this.topItems);
    allItems.forEach(item => {
      item.isSelected = false;
    });
    item.isSelected = !item.isSelected;

    if(updateSidebar){
      this.sidebarService.sidebarVisible = false;
    }

    
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
    this.router.navigate(["/start"])
  }

  private onRouteChanged(url: string){
    console.log(url);
    if(!url) return;
    var item = this.topItems.concat(this.bottomItems).find(x=> x.route != "" && url.includes(x.route));
    if(item){
      this.onItemClick(item);
    }
  }

}


