import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../user/user.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @ViewChild("messageCountTemplate") messageCountTemplate;

  private topItems: Array<SidebarItem>;
  private bottomItems: Array<SidebarItem>;

  constructor(private userService: UserService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    var searchItem = new SidebarItem("search", "Search", "search-icon");

    var profileItem = new SidebarItem("profile", "Profile", "person-icon");
    profileItem.visibleForLogged = true;

    var messagesItem = new SidebarItem("", "Messages", "messenger-icon");
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
    ]
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
    this.userService.avatar = undefined;
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
