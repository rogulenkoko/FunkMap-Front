import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackListService } from 'app/tools/soundcloud/track-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'entity-sound',
  templateUrl: './entity-sound.component.html',
  styleUrls: ['./entity-sound.component.scss'],
  providers: [TrackListService]
})
export class EntitySoundComponent implements OnInit, OnDestroy {

  private selectedTab = 1;

  private subscription: Subscription;

  constructor(private trackListService: TrackListService) {
    this.subscription = new Subscription();
    this.subscription.add(this.trackListService.onTrackAdded.subscribe(x=>this.onAddedToPlaylist(x)));
    this.subscription.add(this.trackListService.onTrackDeleted.subscribe(x=>this.onDeletedFromPlaylist(x)));
   }

  ngOnInit() {
    

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private selectTab(tab: number){
    this.selectedTab = tab;
  }

  private onAddedToPlaylist(id: number){
    //todo
  }

  private onDeletedFromPlaylist(id: number){
    //todo
  }

}
