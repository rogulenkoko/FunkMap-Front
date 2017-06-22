import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string;
  @Input() widthPerCent: string = "30.5%";
  @Input() height: string;

  @Input() canClose: boolean = true;
  @Input() backgroundEnabled: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
