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
      new Contact("fa fa-phone", "+7 (969) 702-55-46"),
      new Contact("fa fa-envelope", "bandmap@mail.ru"),
      new Contact("fa fa-vk", "vk.com/bandmapofficial")
    ];
   }

  ngOnInit() {
  }

}

export class Contact{
  constructor(public icon: string, public info: string){}
}
