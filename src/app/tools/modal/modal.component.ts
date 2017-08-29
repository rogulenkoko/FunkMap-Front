import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from "@angular/router";

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

  @Output() onClosed: EventEmitter<any>;

  constructor(private router: Router) {
    this.onClosed = new EventEmitter();
   }

  ngOnInit() {
  }

  close(){
    this.onClosed.emit();
    this.router.navigate(['/']);
  }

}
