import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TrackListService } from 'app/tools/soundcloud/track-list.service';
import { Subscription } from 'rxjs/Subscription';
import { BaseModel } from 'app/core/models/base-model';
import { UserService } from 'app/main/user/user.service';
import { EditService } from 'app/tools/entity-full/edit.service';
import { EditableCard } from 'app/tools/entity-full/editable-card';
import { SoundcloudService } from 'app/tools/soundcloud/soundcloud.service';
import { BaseEditService } from 'app/tools/entity-full/base-edit.service';

@Component({
  selector: 'entity-sound',
  templateUrl: './entity-sound.component.html',
  styleUrls: ['./entity-sound.component.scss']
})
export class EntitySoundComponent extends EditableCard implements OnInit, OnDestroy {


  @Input() entity: BaseModel;

  @Input() height: string = "480px";

  private selectedTab = 2;

  private subscription: Subscription;

  private trackIds: Array<number>;

  constructor(private trackListService: TrackListService,
    private editService: EditService,
    private baseEditService: BaseEditService) {
    super();
    this.subscription = new Subscription();
    this.subscription.add(this.trackListService.onTrackAdded.subscribe(x => this.onAddedToPlaylist(x)));
    this.subscription.add(this.trackListService.onTrackDeleted.subscribe(x => this.onDeletedFromPlaylist(x)));
  }

  ngOnInit() {
    this.isUsers = this.editService.isUsers;
    this.trackIds = this.entity.soundCloudTrackIds;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private selectTab(tab: number) {
    this.selectedTab = tab;
  }

  private onAddedToPlaylist(id: number) {
    if(!this.entity) return;
    if(this.entity.soundCloudTrackIds.find(x=> x == id)) return;

    var entity = new BaseModel(this.entity.login, this.entity.name, this.entity.entityType);

    if (entity.soundCloudTrackIds) {
      entity.soundCloudTrackIds.push(id);
    } else {
      entity.soundCloudTrackIds = [id];
    }

    this.baseEditService.update(entity).subscribe(response => {

    });
  }

  private onDeletedFromPlaylist(id: number) {

    if(!this.entity.soundCloudTrackIds.find(x=> x == id)) return;

    var entity = new BaseModel(this.entity.login, this.entity.name, this.entity.entityType);
    
    entity.soundCloudTrackIds = this.entity.soundCloudTrackIds.filter(x=> x != id); 
    this.baseEditService.update(entity).subscribe(response => {

    });
  }

}
