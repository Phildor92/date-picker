import { Locator } from "@playwright/test";

export class ContactListPageObject {

  constructor(protected host: Locator) { }

  public contacts = this.host.locator('tbody tr');
  public deleteButtons = this.host.locator('tbody tr td button.btn-danger');
}
