import { Component, OnInit } from '@angular/core';
import { CreationService } from "app/main/creation/creation.service";
import { MusicStyle } from "app/main/musician/models";
import { Dictionary } from "typescript-collections";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";
import { Band } from "app/main/band/models";

@Component({
  selector: 'band-creation',
  templateUrl: './band-creation.component.html',
  styleUrls: ['./band-creation.component.scss', '../creation.component.scss']
})
export class BandCreationComponent implements OnInit {

  private currenSelectedStyle: MusicStyle = undefined;
  private styles: Dictionary<MusicStyle, string>;

  constructor(private creationService: CreationService,
              private musicianTypesProvider: MusicianTypesProvider) {
    this.creationService.band = new Band();
    this.styles = new Dictionary<MusicStyle, string>();
    this.musicianTypesProvider.musicStyles.keys().forEach(key => {
      this.styles.setValue(key, this.musicianTypesProvider.musicStyles.getValue(key));
    });
  }

  ngOnInit() {

  }

  onStyleChanged() {
    this.creationService.band.styles.push(this.currenSelectedStyle); 
    this.styles.remove(this.currenSelectedStyle);
    this.currenSelectedStyle = undefined;
  }

  removeStyle(musicianStyle: MusicStyle) {
    this.creationService.band.styles.splice(this.creationService.band.styles.findIndex(x => x == musicianStyle), 1);
    this.styles.setValue(musicianStyle, this.musicianTypesProvider.musicStyles.getValue(musicianStyle));
  }

}
