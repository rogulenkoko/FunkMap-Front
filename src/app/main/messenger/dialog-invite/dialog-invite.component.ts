import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dialog-invite',
  templateUrl: './dialog-invite.component.html',
  styleUrls: ['./dialog-invite.component.scss']
})
export class DialogInviteComponent implements OnInit {

  @Input() visible: boolean;

  

  constructor() { }

  ngOnInit() {
  }

}
