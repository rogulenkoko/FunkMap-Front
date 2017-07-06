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

  private subscription: Subscription;

  private avatarImage: string;


  constructor(private musicianService: MusicianService,
              private typesProvider: MusicianTypesProvider,
              private route: ActivatedRoute,
              private router: Router) {
        this.subscription = new Subscription();
        this.subscription.add(this.router.events.subscribe((value: NavigationEnd)=>{
          var pathParts = value.url.split('/');
          if(!pathParts.find(x=>x=="musician")) return;
          this.updateMusician(pathParts[pathParts.length - 1]);
        }));
  }

  ngOnInit() {
    var id = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private updateMusician(login: string){
    
    if(this.lastMusicianLogin == login) return;
    this.lastMusicianLogin = login;
    if(this.musician && login == this.musician.login) return;
    this.musicianService.getMusicianPreview(login).subscribe(musician=>{
      this.musician = musician;
      this.avatarImage = "data:image/png;base64," + musician.avatar;
    });
  }

}
