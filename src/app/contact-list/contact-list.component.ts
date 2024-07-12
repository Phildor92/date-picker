import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../models/contact.model';
import { ContactNamePipe } from "../pipes/contact-name.pipe";
import { SelectableDirective, SelectionChange } from '../directives/selectable.directive';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'dp-contact-list',
  standalone: true,
  imports: [ContactNamePipe, SelectableDirective],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  @Input() contacts?: Contact[] = [];
  @Output() deleted = new EventEmitter<Contact>();
  @Output() edit = new EventEmitter<Contact>();
  @Output() contactsSelected = new EventEmitter<Set<Contact>>();

  private editingContacts = new Set<Contact>();
  private selectedContacts = new Set<Contact>();

  delete(contact: Contact) {
    this.deleted.emit(contact);
  }

  changeColor(contact: Contact, event: Event) {
    contact.color = (event.target as HTMLInputElement).value;
  }

  setEditMode(contact: Contact,  editForm: NgForm) {
    if (this.isInEditMode(contact)) {
      if (editForm.valid) {
        this.editingContacts.delete(contact);
        this.edit.emit(contact);
      }
    } else {
      this.editingContacts.add(contact);
    }
  }

  isInEditMode(contact: Contact) {
    return this.editingContacts.has(contact);
  }

  updateSelection({ selected, subject }: SelectionChange<Contact>) {
    if (selected) {
      this.selectedContacts.add(subject);
    } else {
      this.selectedContacts.delete(subject);
    }

    this.contactsSelected.emit(this.selectedContacts);
  }
}
