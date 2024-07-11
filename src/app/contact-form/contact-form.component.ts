import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '../models/contact.model';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'dp-contact-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  editingContacts = new Set<Contact>();
  @Output() add = new EventEmitter<Contact>();

  newContact: Contact = {
    id: '',
    email: '',
    firstName: '',
    surname: '',
  };

  addContact(contactForm: NgForm) {
    this.add.emit({ ...this.newContact });
    contactForm.reset();
  }

  setEditMode(contact: Contact, editForm: NgForm) {
		if (this.isInEditMode(contact)) {
			if (editForm.valid) {
				this.editingContacts.delete(contact);
			}
		} else {
			this.editingContacts.add(contact);
		}
	}

	isInEditMode(contact: Contact) {
		return this.editingContacts.has(contact);
	}
}
