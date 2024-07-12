import { test, expect } from '@playwright/test';
import { ContactsPage } from './pom/contacts-page.pom';


test.describe('contacts page', () => {
  let page: ContactsPage;

  test.beforeEach(async ({ page: p }) => {
    page = new ContactsPage(p);
    await page.navigateTo();
  });

  test.describe('add contact form', () => {

    test('has title', async ({ page }) => {
      await page.goto('');

      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/DatePicker/);
    });

    test('should not allow submit at the start', async ({ page }) => {
      await page.goto('');
      const contactPage = new ContactsPage(page);
      const contactForm = contactPage.contactForm;

      const nameInput = page.locator('#nameInput');
      await expect(nameInput).toBeVisible();

      const surnameInput = page.getByLabel('Surname');
      await expect(surnameInput).toBeVisible();

      const emailInput = page.locator('#emailInput');
      await expect(emailInput).toBeVisible();

      await expect(contactForm.submitButton).toBeDisabled();
    })

    test('should allow submit when the contact is valid', async () => {
      const contactForm = page.contactForm;
      await contactForm.enterFirstName('John');
      await contactForm.enterSurname('Doe');
      await contactForm.enterEmail('john.doe@gmail.com');
      await expect(contactForm.submitButton).toBeEnabled();
    });

    test('should not allow submit when the first name is missing ', async () => {
      const contactForm = page.contactForm;
      await contactForm.enterSurname('Doe');
      await contactForm.enterEmail('john.doe@gmail.com');
      await expect(contactForm.submitButton).toBeDisabled();
    });

    test('should not allow submit when the first name is too short ', async () => {
      const contactForm = page.contactForm;
      await contactForm.enterFirstName('J');
      await contactForm.enterSurname('Doe');
      await contactForm.enterEmail('john.doe@gmail.com');
      await expect(contactForm.submitButton).toBeDisabled();
    });

    test('should not allow submit when the surname is missing ', async () => {
      const contactForm = page.contactForm;
      await contactForm.enterFirstName('John');
      await contactForm.enterEmail('john.doe@gmail.com');
      await expect(contactForm.submitButton).toBeDisabled();
    });

    test('should not allow submit when the e-mail is missing ', async () => {
      const contactForm = page.contactForm;
      await contactForm.enterFirstName('John');
      await contactForm.enterSurname('Doe');
      await expect(contactForm.submitButton).toBeDisabled();
    });

    test('should add contact to list when submitted', async () => {
      expect(page.contactList.contacts).toHaveCount(3);

      const contactForm = page.contactForm;
      await contactForm.enterFirstName('John');
      await contactForm.enterSurname('Doe');
      await contactForm.enterEmail('john.doe@gmail.com');
      await contactForm.submitButton.click();

      await expect(page.contactList.contacts).toHaveCount(4);
    })
  });
});
