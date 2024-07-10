import { Component } from '@angular/core';
import { Contact } from './models/contact.model';
import { ContactNamePipe } from './pipes/contact-name.pipe';
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { ContactListComponent } from "./contact-list/contact-list.component";

@Component({
  selector: 'dp-root',
  standalone: true,
  imports: [ContactNamePipe, ContactFormComponent, ContactListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  name: string;
  contacts: Contact[] = [
    { id: 4, firstName: 'Sam', surname: 'Smith', email: 'sam.smith@music.com' },
    { id: 8, firstName: 'Frank', surname: 'Muscles', email: 'frank@muscles.com' },
    { id: 15, firstName: 'Eddy', surname: 'Valentino', email: 'eddy@valfam.co.uk' },
  ];



  constructor() {
    this.name = 'world!';
  }

  deleteContact(contact: Contact) {
    this.contacts.splice(this.contacts.indexOf(contact), 1);
  }

  addContact(contact: Contact) {
    this.contacts.push(contact);
  }
}
