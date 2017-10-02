import { Component, OnInit, Input } from '@angular/core';
import { Band } from 'app/main/band/models';
import { Musician, MusicianPreview } from 'app/main/musician/models';
import { MusicianService } from 'app/main/musician/musician.service';
import { MusicianTypesProvider } from 'app/main/musician/musician-types-provider';

@Component({
  selector: 'band-participants',
  templateUrl: './band-participants.component.html',
  styleUrls: ['./band-participants.component.scss']
})
export class BandParticipantsComponent implements OnInit {

  @Input() band: Band;
  private musicians: Array<MusicianPreview> = [];

  constructor(private musicianService: MusicianService,
              private musicianTypesProvider: MusicianTypesProvider) { }

  ngOnInit() {
    this.refreshMusicians();
  }

  private refreshMusicians(){
    this.band.musicians.forEach(musicianLogin => {
      this.musicianService.getMusicianPreview(musicianLogin).subscribe(musician=> {
        console.log(musician);
        this.musicians.push(musician);
      });
    });
  }

}
