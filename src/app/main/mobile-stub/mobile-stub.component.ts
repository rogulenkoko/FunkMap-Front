import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'app/core';

@Component({
  selector: 'mobile-stub',
  templateUrl: './mobile-stub.component.html',
  styleUrls: ['./mobile-stub.component.scss']
})
export class MobileStubComponent implements OnInit {

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
  }

}
