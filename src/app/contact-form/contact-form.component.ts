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
  @Output() add = new EventEmitter<Contact>();

  newContact: Contact = {
    id: 0,
    email: '',
    firstName: '',
    surname: '',
  };

  addContact(contactForm: NgForm) {
    this.add.emit({ ...this.newContact });
    contactForm.reset();
  }
}
