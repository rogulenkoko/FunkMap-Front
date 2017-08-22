import { Component, OnInit } from '@angular/core';
import { EditService } from "app/tools/entity-full/edit.service";
import { StudioService } from "app/main/studio/studio.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-studio-full',
  templateUrl: './studio-full.component.html',
  styleUrls: ['./studio-full.component.scss'],
  providers: [EditService]
})
export class StudioFullComponent implements OnInit {

  constructor(private editService: EditService,
              private studioService: StudioService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var login = params["id"];
      this.refreshBand(login);
    })
  }

  private refreshBand(login: string) {
    this.studioService.getStudio(login).subscribe(studio => {
      this.editService.baseModel = studio;
    })
  }

}
