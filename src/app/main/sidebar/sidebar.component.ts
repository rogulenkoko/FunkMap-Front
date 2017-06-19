import { Component, OnInit } from '@angular/core';
import { UserService } from "../user/user.service";

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  logOut(){
    this.userService.user = undefined;
    this.userService.avatar = undefined;
  }

}
