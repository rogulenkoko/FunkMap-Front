import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'entity-sound',
  templateUrl: './entity-sound.component.html',
  styleUrls: ['./entity-sound.component.scss']
})
export class EntitySoundComponent implements OnInit {

  private selectedTab = 1;

  private trackIds: Array<number> = [];

  constructor() { }

  ngOnInit() {
  }

  private selectTab(tab: number){
    this.selectedTab = tab;
  }

  private onAddedToPlaylist(id: number){
    this.trackIds.push(id);
  }

}
