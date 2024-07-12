import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact.model';
import { ContactService } from '../services/contact.service';
import { ContactFormComponent } from "../contact-form/contact-form.component";
import { ContactListComponent } from "../contact-list/contact-list.component";

@Component({
  selector: 'dp-contacts-page',
  standalone: true,
  imports: [ContactFormComponent, ContactListComponent],
  templateUrl: './contacts-page.component.html',
  styleUrl: './contacts-page.component.scss'
})
export class ContactsPageComponent implements OnInit {
  contacts?: Contact[] =[];
  selectedContacts?:Set<Contact>;
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

  selectContacts(contacts: Set<Contact> ){
    this.selectedContacts = contacts;
  }

  invite(){
    console.log('inviting ' + this.selectedContacts?.size);
  }
}
