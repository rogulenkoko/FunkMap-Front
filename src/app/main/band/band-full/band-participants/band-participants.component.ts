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

@Component({
  selector: 'band-participants',
  templateUrl: './band-participants.component.html',
  styleUrls: ['./band-participants.component.scss']
})
export class BandParticipantsComponent extends EditableCard implements OnInit {

  @Input() band: Band;
  private musicians: Array<MusicianPreview> = [];
  

  constructor(private musicianService: MusicianService,
              private musicianTypesProvider: MusicianTypesProvider,
              private baseEditService: BaseEditService,
              userService: UserService,
              userDataService: UserDataService,
              editService: EditService) {
    super(userService, userDataService);
  }

  ngOnInit() {
    this.refreshMusicians();
    this.checkIsUserEntity(this.band.login);
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
    var band = new Band(this.band.login);
    band.musicians = this.band.musicians.filter(x=>x != musician.login);
    this.baseEditService.update(band).subscribe(response=>{
      if(response.success){
        this.band.musicians = band.musicians;
        this.musicians = [];
        this.refreshMusicians();
      }
    });
  }

}
