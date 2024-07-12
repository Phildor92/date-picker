import { Page } from '@playwright/test';
import { ContactFormPageObject } from './contact-form.pom';
import { ContactListPageObject } from './contact-list.pom';

export class ContactsPage {
  constructor(private page: Page) { }

  public contactForm = new ContactFormPageObject(
    this.page.locator('.add-contact-form')
  );

  public contactList = new ContactListPageObject(this.page.locator('.contact-list'))

  public navigateTo() {
    return this.page.goto('/')
  }
}


