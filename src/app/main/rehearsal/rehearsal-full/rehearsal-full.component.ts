import { Component, OnInit } from '@angular/core';
import { EditService } from "app/tools/entity-full/edit.service";
import { ActivatedRoute } from "@angular/router";
import { RehearsalService } from "app/main/rehearsal/rehearsal.service";

@Component({
  selector: 'app-rehearsal-full',
  templateUrl: './rehearsal-full.component.html',
  styleUrls: ['./rehearsal-full.component.scss'],
  providers: [EditService]
})
export class RehearsalFullComponent implements OnInit {

  constructor(private editService: EditService,
              private rehearsalService: RehearsalService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var login = params["id"];
      this.refreshBand(login);
    })
  }

  private refreshBand(login: string) {
    this.rehearsalService.getRehearsal(login).subscribe(rehearsal => {
      this.editService.baseModel = rehearsal;
    })
  }

}
