import { Component, OnInit, Input } from '@angular/core';
import { SearchItem } from "app/main/search/search-item";
import { MusicianTypesProvider } from "app/main/musician/musician-types-provider";

@Component({
  selector: 'search-band',
  templateUrl: './search-band.component.html',
  styleUrls: ['./search-band.component.scss']
})
export class SearchBandComponent implements OnInit {

  @Input() item: SearchItem;
 
  constructor(private musicianTypesProvider: MusicianTypesProvider) { }

  ngOnInit() {
    if(this.item && this.item.styles && this.item.styles.length > 3){
      this.item.styles = this.item.styles.slice(0,3);
    }
  }

}
