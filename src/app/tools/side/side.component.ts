import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
