import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact.model';

@Pipe({
  name: 'contactName',
  standalone: true
})
export class ContactNamePipe implements PipeTransform {

  transform(value: Contact): unknown {
    return `${value.firstName} ${value.surname}`;
  }

}
