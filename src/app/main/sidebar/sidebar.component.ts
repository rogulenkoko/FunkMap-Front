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
    this.topItems = [
      new SidebarItem("search", "Search", "search-icon"),
      new SidebarItem("", "Person", "person-icon"),
      new SidebarItem("", "Messages", "messenger-icon", null, this.messageCountTemplate),
      new SidebarItem("favorites", "Favorites", "star-icon")
    ]

    this.bottomItems = [
      new SidebarItem("settings", "Settings", "settings-icon"),
      new SidebarItem("", "Logout", "exit-icon", ()=> this.logOut())
    ]
  }

  onItemClick(item: SidebarItem){
    if(item.clickEvent){
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
  constructor(public route: string, public title, public iconClass, public clickEvent?:()=>void, public rightTemplate?: any) {

  }

  public isSelected: boolean;
}
