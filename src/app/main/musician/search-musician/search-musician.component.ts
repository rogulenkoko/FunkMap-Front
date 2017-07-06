import { Component, OnInit, Input } from '@angular/core';
import { SearchItem } from "app/main/search/search-item";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";

@Component({
  selector: 'search-musician',
  templateUrl: './search-musician.component.html',
  styleUrls: ['./search-musician.component.scss']
})
export class SearchMusicianComponent implements OnInit {

  @Input() item: SearchItem;

  constructor(private musicianTypesProvider: MusicianTypesProvider) { }

  ngOnInit() {
  
  }

}
