import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  private contacts: Array<Contact>;

  constructor() {
    this.contacts = [
      new Contact("icon-pin", "+7 (969) 702-55-46"),
      new Contact("icon-pin", "bandmap@mail.ru"),
      new Contact("icon-pin", "vk.com/bandmapofficial")
    ];
   }

  ngOnInit() {
  }

}

export class Contact{
  constructor(public icon: string, public info: string){}
}
