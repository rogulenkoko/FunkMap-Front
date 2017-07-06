import { Component, OnInit, Input } from '@angular/core';
import { SearchItem } from "app/main/search/search-item";

@Component({
  selector: 'search-studio',
  templateUrl: './search-studio.component.html',
  styleUrls: ['./search-studio.component.scss']
})
export class SearchStudioComponent implements OnInit {

  @Input() item: SearchItem;

  constructor() { }

  ngOnInit() {
  }

}
