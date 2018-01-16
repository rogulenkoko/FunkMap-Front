import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'about-info',
  templateUrl: './about-info.component.html',
  styleUrls: ['./about-info.component.scss']
})
export class AboutInfoComponent implements OnInit {

  private creators: Array<Creator>;

  constructor() { 
    this.creators = [
      new Creator("About_Rogulenko", "About_Developer", "/assets/images/rogulenko.jpeg", "https://vk.com/id30724049"),
      new Creator("About_Grigorjev", "About_Designer","/assets/images/grigorjev.jpg", "https://vk.com/true_kbn"),
    ]
  }

  ngOnInit() {
  }

}

export class Creator{
  constructor(public name: string, public role: string, public image: string, public link: string){}
}