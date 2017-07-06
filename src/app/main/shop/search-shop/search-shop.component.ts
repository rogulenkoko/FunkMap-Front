import { Component, OnInit, Input } from '@angular/core';
import { SearchItem } from "app/main/search/search-item";

@Component({
  selector: 'search-shop',
  templateUrl: './search-shop.component.html',
  styleUrls: ['./search-shop.component.scss']
})
export class SearchShopComponent implements OnInit {


  @Input() item: SearchItem;

  constructor() { }

  ngOnInit() {
  }

}
