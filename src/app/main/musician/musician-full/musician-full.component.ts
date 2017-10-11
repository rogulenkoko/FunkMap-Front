import { Component, OnInit } from '@angular/core';
import { Musician } from "app/main/musician/models";
import { MusicianService } from "app/main/musician/musician.service";
import { ActivatedRoute } from "@angular/router";
import { EditService } from "app/tools/entity-full/edit.service";
import { BaseEditService } from 'app/tools/entity-full/base-edit.service';

@Component({
  selector: 'app-musician-full',
  templateUrl: './musician-full.component.html',
  styleUrls: ['./musician-full.component.scss'],
  providers: [EditService]
})
export class MusicianFullComponent implements OnInit {

  constructor(private musicianService: MusicianService,
    private route: ActivatedRoute,
    private editService: EditService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var login = params["id"];
      this.refreshMusician(login);
    })

  }

  private refreshMusician(login: string) {
    if(this.editService.baseModel && this.editService.baseModel.login == login){
      return;
    }
    this.musicianService.getMusician(login).subscribe(musician => {
      this.editService.baseModel = musician;
    })
  }

}
