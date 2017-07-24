import { Component, OnInit } from '@angular/core';
import { Musician } from "app/main/musician/models";
import { MusicianService } from "app/main/musician/musician.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-musician-full',
  templateUrl: './musician-full.component.html',
  styleUrls: ['./musician-full.component.scss']
})
export class MusicianFullComponent implements OnInit {

  private musician: Musician;

  constructor(private musicianService: MusicianService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var login = params["id"];
      this.refreshMusician(login);
    })

  }

  private refreshMusician(login: string) {
    this.musicianService.getMusician(login).subscribe(musician => {
      this.musician = musician;
    })
  }

}
