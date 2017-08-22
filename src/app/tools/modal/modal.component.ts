import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string;
  @Input() minWidth: string;
  @Input() height: string;
  @Input() width: string;

  @Input() canClose: boolean = true;
  @Input() backgroundEnabled: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
