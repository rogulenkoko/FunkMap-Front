import { Component, OnInit, Input } from '@angular/core';
import { SearchItem } from "app/main/search/search-item";

@Component({
  selector: 'search-rehearsal',
  templateUrl: './search-rehearsal.component.html',
  styleUrls: ['./search-rehearsal.component.scss']
})
export class SearchRehearsalComponent implements OnInit {

  @Input() item: SearchItem;

  constructor() { }

  ngOnInit() {
  }

}
