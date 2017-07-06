import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RehearsalService } from "app/main/rehearsal/rehearsal.service";
import { RehearsalPreview } from "app/main/rehearsal/models/rehearsal-preview";

@Component({
  selector: 'app-rehearsal',
  templateUrl: './rehearsal.component.html',
  styleUrls: ['./rehearsal.component.scss']
})
export class RehearsalComponent implements OnInit {

  private rehearsal: RehearsalPreview;

  constructor(private rehearsalService: RehearsalService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(x=>{
      this.updateRehearsal(x["id"]);
    });
  }

  private updateRehearsal(login: string){
    this.rehearsalService.getRehearsal(login).subscribe(rehearsal=>{
      this.rehearsal = rehearsal;
    })
  }

}
