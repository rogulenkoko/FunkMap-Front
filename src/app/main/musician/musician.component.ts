import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router"
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
              private typesProvider: MusicianTypesProvider,
              private route: ActivatedRoute,
              private router: Router) {
        this.router.events.subscribe((value: NavigationEnd)=>this.updateMusician(Number(value.url.split('/')[value.url.split('/').length - 1])));
  }

  ngOnInit() {
    var id = Number(this.route.snapshot.url[this.route.snapshot.url.length - 1].path);
    
  }

  private updateMusician(id: number){
    if(this.musician && id == this.musician.id) return;
    this.musicianService.getMusician(id).subscribe(musician=>{
      this.musician = musician;
    });
  }

}
