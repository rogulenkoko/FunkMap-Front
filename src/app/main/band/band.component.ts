import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Band } from "./band";
import { BandService } from "./band.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-band',
  templateUrl: './band.component.html',
  styleUrls: ['./band.component.scss']
})
export class BandComponent implements OnInit, OnDestroy {

  private band: Band;

  private subscription: Subscription;

  constructor(private bandService: BandService,
              private route: ActivatedRoute,
              private router: Router) {
    this.subscription = new Subscription();
    this.subscription.add(this.router.events.subscribe((value: NavigationEnd) => {
      var pathParts = value.url.split('/');
      if (!pathParts.find(x => x == "band")) return;
      this.updateBand(Number(pathParts[pathParts.length - 1]));
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private updateBand(id: number){
    this.bandService.getBand(id).subscribe(band=>{
      this.band = band;
    })
  }

}
