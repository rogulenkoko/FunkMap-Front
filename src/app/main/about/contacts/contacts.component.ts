import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  private contacts: Array<Contact>;
  private linkContacts: Array<Contact>;

  constructor() {
    this.contacts = [
      new Contact("icon-phone", "+7 (969) 702-55-46"),
      new Contact("icon-mail", "bandmap@mail.ru")
     
    ];

    this.linkContacts = [
      new Contact("icon-vk-1", "vk.com/bandmapofficial", "https://vk.com/bandmapofficial")
    ]
   }

  ngOnInit() {
  }

}

export class Contact{
  constructor(public icon: string, public info: string, public link?: string){}
}
