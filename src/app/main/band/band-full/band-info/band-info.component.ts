import { Component, OnInit, Input } from '@angular/core';
import { Band } from "app/main/band/models";
import { EditService } from "app/tools/entity-full/edit.service";

@Component({
  selector: 'band-info',
  templateUrl: './band-info.component.html',
  styleUrls: ['./band-info.component.scss']
})
export class BandInfoComponent implements OnInit {

  private band: Band;

  constructor(private editService: EditService) { }

  ngOnInit() {
     this.band = this.editService.baseModel as Band;
  }

}
