import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { BandPreview } from "./models";
import { BandService } from "./band.service";
import { Subscription } from "rxjs/Subscription";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";

@Component({
  selector: 'app-band',
  templateUrl: './band.component.html',
  styleUrls: ['./band.component.scss']
})
export class BandComponent implements OnInit {

  private lastBandLogin: string;
  private band: BandPreview;


  constructor(private bandService: BandService,
              private route: ActivatedRoute,
              private router: Router,
              private typesProvider: MusicianTypesProvider) {
    
  }

  ngOnInit() {
    this.route.params.subscribe(x=>{
      this.updateBand(x["id"]);
    });
  }


  private updateBand(login: string){
    if(this.lastBandLogin == login) return;
    this.lastBandLogin = login;
    if(this.band && login == this.band.login) return;
    this.bandService.getBandPreview(login).subscribe(band=>{
      console.log(band);
      this.band = band;
    })
  }

}
