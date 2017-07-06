import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router"
import { MusicianService } from "./musician.service";
import { MusicianPreview } from "./models";
import { MusicianTypesProvider } from "./musician-types-provider";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-musician',
  templateUrl: './musician.component.html',
  styleUrls: ['./musician.component.scss']
})
export class MusicianComponent implements OnInit,OnDestroy {

  private lastMusicianLogin: string;
  private musician: MusicianPreview;


  constructor(private musicianService: MusicianService,
              private typesProvider: MusicianTypesProvider,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(x=>{
      this.updateMusician(x["id"]);
    });
  }

  ngOnDestroy(){
  }

  private updateMusician(login: string){
    
    if(this.lastMusicianLogin == login) return;
    this.lastMusicianLogin = login;
    if(this.musician && login == this.musician.login) return;
    this.musicianService.getMusicianPreview(login).subscribe(musician=>{
      this.musician = musician;
    });
  }

}
