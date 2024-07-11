import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactListComponent } from './contact-list.component';
import { Contact } from '../models/contact.model';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<ContactListComponent>;
  let row: HTMLTableRowElement;
  let contacts: Contact[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
    contacts = [
      {
        id: 0,
        firstName: 'James',
        surname: 'Bond',
        email: 'james.bond@mi6.co.uk',
      },
    ];
    component.contacts = contacts;
    fixture.detectChanges();
    row = element.querySelector<HTMLTableRowElement>(
      'tbody tr:first-child'
    )!;
  });

  it('should show 2 contacts when 2 contacts are bound', async() => {
    const contact1 : Contact = { id: 100, firstName: 'John', surname: 'Doe', email: 'john.doe@gmail.com'};
    const contact2 : Contact = { id: 101, firstName: 'Jane', surname: 'Doe', email: 'jane.doe@gmail.com'};

    component.contacts = [];
    component.contacts.push(contact1);
    component.contacts.push(contact2);

    fixture.detectChanges();
    await fixture.whenStable();

    const cells = element.querySelectorAll('tbody>tr')
    expect(cells.length).toBe(2);
  });

  it('should show the name correctly', async() => {
    const contact1 : Contact = { id: 100, firstName: 'John', surname: 'Doe', email: 'john.doe@gmail.com'};
    const contact2 : Contact = { id: 101, firstName: 'Jane', surname: 'Doe', email: 'jane.doe@gmail.com'};

    component.contacts = [];
    component.contacts.push(contact1);
    component.contacts.push(contact2);

    fixture.detectChanges();
    await fixture.whenStable();

    const cells = element.querySelectorAll('tbody>tr')
    expect(cells.length).toBe(2);
    expect(cells[0].querySelectorAll('td')[0].innerText).toBe('John Doe');
  });

  it('should delete the contact', async() => {
    let actualDeleted: Contact | undefined;
    component.deleted.subscribe((deleted) => {
      actualDeleted = deleted;
    });

    let cells = element.querySelectorAll('tbody>tr');
    expect(cells.length).toBe(1);

    const deleteButton = element.querySelector<HTMLButtonElement>('.btn-danger');
    expect(deleteButton?.innerHTML).toBe("Delete");
    deleteButton?.click();

    fixture.detectChanges();

    cells = element.querySelectorAll('tbody>tr')
    expect(actualDeleted).toBe(contacts[0]);
  });

  xit('should change contact color', async() => {
    const contact1 : Contact = { id: 100, firstName: 'John', surname: 'Doe', email: 'john.doe@gmail.com', color: '#325223'};

    component.contacts = [];
    component.contacts.push(contact1);

    fixture.detectChanges();
    await fixture.whenStable();

    const cells = element.querySelectorAll('tbody>tr')
    expect(cells.length).toBe(1);
  });
});
