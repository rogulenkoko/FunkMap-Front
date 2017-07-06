import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from "app/core";
import { MusicStyle, ExpirienceType } from "app/main/musician/models";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";

@Component({
  selector: 'entity-side',
  templateUrl: './entity-side.component.html',
  styleUrls: ['./entity-side.component.scss']
})
export class EntitySideComponent implements OnInit {

  @Input() item: BaseModel;

  @Input() styles: Array<MusicStyle>;
  @Input() description: string;

  @Input() expirience: ExpirienceType;
  @Input() address: string;
  @Input() website: string;

  private avatarImage: string;

  constructor(private typesProvider: MusicianTypesProvider) { }

  ngOnInit() {
     if(this.item) this.avatarImage = "data:image/png;base64," + this.item.avatar;
  }

}
