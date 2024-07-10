import { Contact } from '../models/contact.model';
import { ContactNamePipe } from './contact-name.pipe';

fdescribe('ContactNamePipe', () => {
  let pipe: ContactNamePipe;

  beforeEach(() => {
    pipe = new ContactNamePipe();
  })

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should concatenate a contact name', () => {
    const contact: Contact = { id: 4, firstName: 'Sam', surname: 'Smith', email: 'sam.smith@music.com' };
    const concatenatedName = pipe.transform(contact);
    expect(concatenatedName).toBe('Sam Smith');
  })
});
