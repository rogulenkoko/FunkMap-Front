import { Component, OnInit } from '@angular/core';
import { MusicianService } from "./musician.service";
import { Musician } from "./models";
import { MusicianTypesProvider } from "./musician-types-provider";

@Component({
  selector: 'app-musician',
  templateUrl: './musician.component.html',
  styleUrls: ['./musician.component.scss']
})
export class MusicianComponent implements OnInit {

  private musician: Musician;

  constructor(private musicianService: MusicianService,
              private typesProvider: MusicianTypesProvider) { }

  ngOnInit() {
    this.musicianService.getMusician(1).subscribe(musician=>{
      this.musician = musician;
    });
  }

}
