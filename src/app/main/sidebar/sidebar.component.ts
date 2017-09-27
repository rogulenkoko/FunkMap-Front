import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from "../user/user.service";
import { ActivatedRoute } from "@angular/router";
import { SignalrService } from "app/tools/signalr/signalr.service";
import { MessengerService } from "app/main/messenger/messenger.service";
import { Dialog, Message } from "app/main/messenger/models";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @ViewChild("messageCountTemplate") messageCountTemplate;

  private topItems: Array<SidebarItem>;
  private bottomItems: Array<SidebarItem>;

  private dialogsWithNewMessages: Array<Dialog>;

  private subscription: Subscription;

  constructor(private signalrService: SignalrService,
              private userService: UserService,
              private route: ActivatedRoute,
              private messengerService: MessengerService) {
    this.subscription = new Subscription();
    this.signalrService.onConnectionStart.subscribe(() => this.initializeSubscriptions());
    this.subscription.add(this.messengerService.onMessagesLoaded.subscribe(()=> this.getNewMessagesCount()));
    
  }

  ngOnInit() {
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

    this.topItems = [
      searchItem,
      profileItem,
      messagesItem,
      favouriteItem
    ]

    this.bottomItems = [
      settingsItem,
      logoutItem
    ];

    this.getNewMessagesCount()

    this.userService.onUserChanged.subscribe(() => this.getNewMessagesCount());
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private getNewMessagesCount() {
    if (!this.userService.user) return;
    this.messengerService.getDialogsWithNewMessages().subscribe(dialogs => {
      this.dialogsWithNewMessages = dialogs;
    });
  }

  private updateNewMessagesCount(message: Message) {
    this.getNewMessagesCount();
  }

  onItemClick(item: SidebarItem) {
    if (item.clickEvent) {
      item.clickEvent();
    }

    var allItems = this.bottomItems.concat(this.topItems);
    allItems.forEach(item => {
      item.isSelected = false;
    });
    item.isSelected = !item.isSelected;
  }

  logOut() {
    this.userService.user = undefined;
  }

  private initializeSubscriptions() {
    this.messengerService.onMessageRecieved.subscribe((message) => this.updateNewMessagesCount(message));
  }

}

export class SidebarItem {
  constructor(public route: string, public title, public iconClass) {

  }

  public clickEvent?: () => void;
  public rightTemplate?: any;
  public visibleForLogged: boolean;

  public isSelected: boolean;
}
