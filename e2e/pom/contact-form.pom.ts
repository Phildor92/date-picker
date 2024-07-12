import { Locator } from '@playwright/test';
export class ContactFormPageObject {
  constructor(protected host: Locator) { }

  public async enterFirstName(value: string) {
    const firstName = this.host.getByLabel('First name');
    await firstName.fill(value);
  }

  public async enterSurname(value: string) {
    const firstName = this.host.getByLabel('Surname');
    await firstName.fill(value);
  }

  public async enterEmail(value: string) {
    const firstName = this.host.getByLabel('E-mail address');
    await firstName.fill(value);
  }

  public submitButton = this.host.getByRole('button', {name: 'Add'});
}
