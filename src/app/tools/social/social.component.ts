import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  @Input() vkLink: string;
  @Input() facebookLink: string;
  @Input() youTubeLink: string;
  @Input() soundCloudLink: string;

  @Input() isMinified: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
