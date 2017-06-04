import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router"
import { MusicianService } from "./musician.service";
import { Musician } from "./models";
import { MusicianTypesProvider } from "./musician-types-provider";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-musician',
  templateUrl: './musician.component.html',
  styleUrls: ['./musician.component.scss']
})
export class MusicianComponent implements OnInit,OnDestroy {

  private lastMusicianId: number;
  private musician: Musician;

  private subscription: Subscription;


  constructor(private musicianService: MusicianService,
              private typesProvider: MusicianTypesProvider,
              private route: ActivatedRoute,
              private router: Router) {
        this.subscription = new Subscription();
        this.subscription.add(this.router.events.subscribe((value: NavigationEnd)=>{
          var pathParts = value.url.split('/');
          if(!pathParts.find(x=>x=="musician")) return;
          this.updateMusician(Number(pathParts[pathParts.length - 1]));
        }));
  }

  ngOnInit() {
    var id = Number(this.route.snapshot.url[this.route.snapshot.url.length - 1].path);
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private updateMusician(id: number){
    
    if(this.lastMusicianId == id) return;
    this.lastMusicianId = id;
    if(this.musician && id == this.musician.id) return;
    this.musicianService.getMusician(id).subscribe(musician=>{
      this.musician = musician;
    });
  }

}
