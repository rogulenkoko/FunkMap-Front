import { Component, OnInit } from '@angular/core';
import { EditService } from "app/tools/entity-full/edit.service";

@Component({
  selector: 'band-map',
  templateUrl: './band-map.component.html',
  styleUrls: ['./band-map.component.scss']
})
export class BandMapComponent implements OnInit {

  constructor(private editService: EditService) { }

  ngOnInit() {
  }

}
