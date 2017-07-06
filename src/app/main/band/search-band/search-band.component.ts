import { Component, OnInit, Input } from '@angular/core';
import { SearchItem } from "app/main/search/search-item";

@Component({
  selector: 'search-band',
  templateUrl: './search-band.component.html',
  styleUrls: ['./search-band.component.scss']
})
export class SearchBandComponent implements OnInit {

  @Input() item: SearchItem;
 
  constructor() { }

  ngOnInit() {
  }

}
