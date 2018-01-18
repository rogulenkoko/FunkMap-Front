import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Musician } from "app/main/musician/models";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";
import { UserDataService } from "app/main/user/user-data.service";
import { UserService } from "app/main/user/user.service";
import { EditService } from "app/tools/entity-full/edit.service";
import { MusicianService } from "app/main/musician/musician.service";
import { InfoItem } from 'app/tools/entity-full/info-item';
import { ActionItem } from 'app/tools/entity-full/action-item';
import { BandInviteMusicianRequest, BandInviteInfoRequest, BandInviteInfo } from 'app/main/musician/models/band-invite-musician-request';
import { EntityType } from 'app/main/map/models';
import * as moment from "moment";
import { Subscription } from 'rxjs/Subscription';
import { BaseService } from 'app/tools/base.service';
import { TranslateSelectItem } from 'app/tools/select';

@Component({
  selector: 'musician-base',
  templateUrl: './musician-base.component.html',
  styleUrls: ['./musician-base.component.scss']
})
export class MusicianBaseComponent implements OnInit, OnDestroy {

  private musician: Musician;
  private newMusician: Musician;

  private infoItems: Array<InfoItem>;
  private actionItems: Array<ActionItem>;

  private hasBand: boolean;
  private isGroupsModalVisible: boolean = false;
  private inviteInfo: BandInviteInfo;
  private bandForInvite: string;

  private bands: Array<TranslateSelectItem>;

  private subscription: Subscription;

  @ViewChild('nameEditTemplate') nameEditTemplate;
  @ViewChild('netsEditTemplate') netsEditTemplate;
  @ViewChild('inviteToBandActionTemplate') inviteToBandActionTemplate;

  constructor(private musicianTypesProvider: MusicianTypesProvider,
              private baseService: BaseService,
              private userDataService: UserDataService,
              private userService: UserService,
              private editService: EditService,
              private musicianService: MusicianService) {
    this.subscription = new Subscription();
    this.musician = this.editService.baseModel as Musician;

    this.subscription.add(this.editService.onSaved.subscribe((musician) => this.onChanged(musician)));
  }

  ngOnInit() {
    this.updateInfoItems();
    this.checkHasBand();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private updateInfoItems() {
    this.newMusician = Object.create(this.musician);

    var nameInfoItem = new InfoItem();
    nameInfoItem.propertyTitle = "Musician_Name";
    nameInfoItem.propertyEditTemplate = this.nameEditTemplate;

    var netsInfoItem = new InfoItem();
    netsInfoItem.propertyTitle = "Musician_SocialNets";
    netsInfoItem.propertyEditTemplate = this.netsEditTemplate;

    this.musician.age = moment().diff(this.musician.birthDate, 'years');

    this.infoItems = [
      nameInfoItem,
      netsInfoItem
    ];

    var inviteGroupAction = new ActionItem();
    inviteGroupAction.template = this.inviteToBandActionTemplate;
    this.actionItems = [
      inviteGroupAction
    ];
  }

  private save() {
    this.newMusician.login = this.musician.login;
   
    this.musicianService.updateMusician(this.newMusician).subscribe(response => {
      this.refreshMusician();

      this.musician = this.newMusician;
      this.editService.baseModel = this.newMusician;
      this.updateInfoItems();
    });
  }

  private cancel(){
    this.newMusician = Object.create(this.musician);
    this.editService.baseModel = this.newMusician;
    this.updateInfoItems();
  }

  private onChanged(musician: Musician) {
    this.musician = musician;
    this.updateInfoItems();
  }

  private refreshMusician() {
    this.musician = this.newMusician;
    this.updateInfoItems();
  }

  private onAvatarLoaded(avatar: string) {
    var musician = new Musician();
    musician.avatar = avatar;
    this.musicianService.updateMusician(musician).subscribe(response => {

    });
  }

  private inviteToBand() {
    var infoRequest = new BandInviteInfoRequest(this.musician.login);
      this.musicianService.getInviteBandInfo(infoRequest).subscribe(info=>{
        this.inviteInfo = info;
        if(this.inviteInfo.availableBands && this.inviteInfo.availableBands.length > 0) this.bandForInvite = this.inviteInfo.availableBands[0].login;
        this.bands = this.inviteInfo.availableBands.map(x=> new TranslateSelectItem(x.login, x.name));
        this.isGroupsModalVisible = true;
      });
  }

  private sendInvite(){
    var request = new BandInviteMusicianRequest(this.bandForInvite, this.musician.login);
    this.musicianService.inviteToBand(request).subscribe(response=>{
      if(response.success) this.isGroupsModalVisible = false;
      if(response.isOwner){
        if(!this.musician.bandLogins) this.musician.bandLogins = [];
        this.musician.bandLogins.push(this.bandForInvite);
        this.editService.baseModel = this.musician;
      }
    });
  }

  private cancelInvite(){
    this.isGroupsModalVisible = false;
  }

  private checkHasBand() {
    if(!this.userService.user) return;
    this.userDataService.getUserEntitiesCountInfo().subscribe(countInfo => {
      var bandCountInfo = countInfo.counts.find(x => x.entityType == EntityType.Band);
      this.hasBand = bandCountInfo && bandCountInfo.count > 0;
      this.userService.entitiesCountInfo = countInfo.counts;
    });
  }
}
