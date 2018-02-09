import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TrackListService } from 'app/tools/soundcloud/track-list.service';
import { Subscription } from 'rxjs/Subscription';
import { BaseModel, AudioInfo } from 'app/core/models/base-model';
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

  private subscription: Subscription;

  private trackIds: Array<number>;

  private search: string;

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
    this.trackIds = this.entity.soundCloudTracks.map(x=>x.id);
  }

  ngOnDestroy() {
    this.trackListService.tracks = [];
    this.subscription.unsubscribe();
  }

  private onAddedToPlaylist(id: number) {

    var audio = new AudioInfo(id, new Date());

    if (!this.entity) return;
    if (!this.entity.soundCloudTracks) {
      this.entity.soundCloudTracks = [audio];
    } else if (this.entity.soundCloudTracks.find(x => x.id == id)) return;

    this.entity.soundCloudTracks.push(audio);

    var entity = new BaseModel(this.entity.login, this.entity.name, this.entity.entityType);

    entity.soundCloudTracks = this.entity.soundCloudTracks;

    this.baseEditService.update(entity).subscribe(response => {

    });
  }

  private onDeletedFromPlaylist(id: number) {

    if (!this.entity.soundCloudTracks.find(x => x.id == id)) return;

    var entity = new BaseModel(this.entity.login, this.entity.name, this.entity.entityType);

    this.entity.soundCloudTracks = this.entity.soundCloudTracks.filter(x => x.id != id);
    entity.soundCloudTracks = this.entity.soundCloudTracks;

    this.baseEditService.update(entity).subscribe(response => {

    });
  }

  private clear() {
    this.search = undefined;
  }

}
