import { test, expect } from '@playwright/test'
import ContactPage from '../pages/contact.page';
import { faker } from '@faker-js/faker';

test.describe('Contact Test', () => {
  let contactPage: ContactPage;

  test('Fill contact form and verify success message', async ({ page }) => {
    contactPage = new ContactPage(page);

    //open contact page
    await contactPage.navigate();
    // Fill in the form
     await contactPage.submitForm(faker.person.firstName(), faker.internet.email(), faker.phone.number(), faker.lorem.paragraphs(2));

    // verify success message
    await expect(contactPage.successTxt).toHaveText('Thanks for contacting us! We will be in touch with you shortly')

  })

})
