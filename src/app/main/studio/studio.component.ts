import { Component, OnInit } from '@angular/core';
import { StudioService } from "app/main/studio/studio.service";
import { StudioPreview } from "app/main/studio/models/studio-preview";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss']
})
export class StudioComponent implements OnInit {

  private studio: StudioPreview;

  constructor(private studioService: StudioService,
              private route: ActivatedRoute) { }

  ngOnInit() {
     this.route.params.subscribe(x=>{
      this.updateStudio(x["id"]);
    });
  }

  private updateStudio(login: string){
    this.studioService.getStudio(login).subscribe(studio=>{
      this.studio = studio;
    });
  }

}
