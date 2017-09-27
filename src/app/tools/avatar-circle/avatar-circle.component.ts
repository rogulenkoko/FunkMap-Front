import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'avatar-circle',
  templateUrl: './avatar-circle.component.html',
  styleUrls: ['./avatar-circle.component.scss']
})
export class AvatarCircleComponent implements OnInit {

  @Input() image: string;
  @Input() size: string;
  @Input() iconSize: string;

  @Input() isOnline: boolean;

  constructor() { }

  ngOnInit() {
  }

}
