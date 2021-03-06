import { Component, OnInit, Input } from '@angular/core';
import { Band } from 'app/main/band/models';
import { Musician, MusicianPreview } from 'app/main/musician/models';
import { MusicianService } from 'app/main/musician/musician.service';
import { MusicianTypesProvider } from 'app/main/musician/musician-types-provider';
import { EditableCard } from 'app/tools/entity-full/editable-card';
import { EditService } from 'app/tools/entity-full/edit.service';
import { UserDataService } from 'app/main/user/user-data.service';
import { UserService } from 'app/main/user/user.service';
import { BaseEditService } from 'app/tools/entity-full/base-edit.service';
import { BandService } from 'app/main/band/band.service';
import { LeaveBandRequest } from 'app/main/band/models/leave-band-request';
import { BaseService } from 'app/tools/base.service';

@Component({
  selector: 'band-participants',
  templateUrl: './band-participants.component.html',
  styleUrls: ['./band-participants.component.scss']
})
export class BandParticipantsComponent extends EditableCard implements OnInit {

  @Input() band: Band;
  public musicians: Array<MusicianPreview> = [];
  
  public hoveredMusician: string;

  public addRarticipantsMode: boolean;

  private modalHeight: number;

  constructor(private musicianService: MusicianService,
              private musicianTypesProvider: MusicianTypesProvider,
              private bandService: BandService,
              private baseService: BaseService,
              private editService: EditService) {
    super();
  }

  ngOnInit() {
    this.isUsers = this.editService.isUsers;
    this.refreshMusicians();
  }

  private refreshMusicians(){
    if(!this.band || !this.band.musicians) return;
    this.band.musicians.forEach(musicianLogin => {
      this.musicianService.getMusicianPreview(musicianLogin).subscribe(musician=> {
        this.musicians.push(musician);
      });
    });
  }

  private removeMusician(musician: Musician){

    var request = new LeaveBandRequest(this.band.login, musician.login);

    this.bandService.removeMusician(request).subscribe(response=>{
      if(response.success){
        this.band.musicians = this.band.musicians.filter(x=>x != musician.login);
        this.musicians = [];
        this.refreshMusicians();
      }
    });
  }

  private overMusician(login: string){
    this.hoveredMusician = login;
  }

  addParticipants(){

    this.modalHeight = (window.innerHeight - 75) * 0.98;

    this.addRarticipantsMode = true;
  }

  onInviteCanceled(){
    this.addRarticipantsMode = false; 
  }

  onOwnAdded(logins: Array<string>){
    if(!this.band.musicians) this.band.musicians = [];

    logins.forEach(x=> this.band.musicians.push(x));
    this.refreshMusicians();
  }

}
