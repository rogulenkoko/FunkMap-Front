import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'app/main/sidebar/sidebar.service';

@Component({
  selector: 'main-wrapper',
  templateUrl: './main-wrapper.component.html',
  styleUrls: ['./main-wrapper.component.scss']
})
export class MainWrapperComponent implements OnInit {

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
  }

}
