import { Component, OnInit } from '@angular/core';
import { EditService } from "app/tools/entity-full/edit.service";
import { BandService } from "app/main/band/band.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-band-full',
  templateUrl: './band-full.component.html',
  styleUrls: ['./band-full.component.scss'],
  providers: [EditService]
})
export class BandFullComponent implements OnInit {

 

  constructor(private editService: EditService,
              private bandService: BandService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var login = params["id"];
      this.refreshBand(login);
    })
  }

  private refreshBand(login: string) {
    this.bandService.getBand(login).subscribe(band => {
      this.editService.baseModel = band;
    })
  }

}
