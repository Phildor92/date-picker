import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact.model';
import { ContactNamePipe } from './pipes/contact-name.pipe';
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { ContactListComponent } from "./contact-list/contact-list.component";
import { ContactService } from './services/contact.service';

@Component({
  selector: 'dp-root',
  standalone: true,
  imports: [ContactNamePipe, ContactFormComponent, ContactListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  contacts?: Contact[] =[];
  name: string;

  constructor(private contactService: ContactService) {
    this.name = 'world!';
    this.contactService = contactService;
  }

  ngOnInit(): void{
    this.updateContacts();
  }

  private updateContacts() {
		this.contactService.getObservable().subscribe(contacts => {
			this.contacts = contacts;
		});
	}

  deleteContact(contact: Contact) {
    this.contactService.delete(contact.id);
  }

  addContact(contact: Contact) {
    this.contactService.create(contact);
  }
}
