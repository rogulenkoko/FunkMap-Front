import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'entity-info',
  templateUrl: './entity-info.component.html',
  styleUrls: ['./entity-info.component.scss']
})
export class EntityInfoComponent implements OnInit {

  @Input() items: Array<InfoItem>;

  constructor() { }

  ngOnInit() {
  }

}

export class InfoItem{
  public propertyTitle: string;
  public propertyValue: string;
  public propertyTemplate: any;
}
