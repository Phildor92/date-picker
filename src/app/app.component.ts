import { Component } from '@angular/core';
import { Contact } from './models/contact.model';
import { ContactNamePipe } from './pipes/contact-name.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ ContactNamePipe ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  name: string;
  contacts: Contact[] = [
    { id: 4, firstName: 'Sam', surname: 'Smith', email: 'sam.smith@music.com', color: '#fff' },
    { id: 8, firstName: 'Frank', surname: 'Muscles', email: 'frank@muscles.com', color: '#fff'},
    { id: 15, firstName: 'Eddy', surname: 'Valentino', email: 'eddy@valfam.co.uk', color: '#fff'},
  ];

  constructor() {
    this.name = 'world!';
  }

  delete(contact: Contact){
    this.contacts.splice(this.contacts.indexOf(contact), 1);
  }

  changeColor(contact: Contact, event: Event){
    contact.color = (event.target as HTMLInputElement).value;
  }
}
