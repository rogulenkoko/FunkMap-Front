import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { environment } from 'environments/environment';

@Component({
  selector: 'avatar-circle',
  templateUrl: './avatar-circle.component.html',
  styleUrls: ['./avatar-circle.component.scss']
})
export class AvatarCircleComponent implements OnInit, OnDestroy {

  @Input() image: string;
  @Input() size: string;
  @Input() iconSize: string;
  @Input() onlineSize: string;

  @Input() useLogo: boolean = false;

  @Input() isOnline: boolean;


  constructor() {

   }

  ngOnInit() {

  }

  ngOnDestroy(){
  }

}
