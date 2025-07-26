import { expect, Locator, Page } from '@playwright/test';
import { clickAndFill } from '../test-utils/click-and-fill';

class RegistrationPage {
  private page: Page;

  liquorLicensetxt: Locator;

  corporateNametxt: Locator;

  businessNametxt: Locator;

  onOroffpremiseDD: Locator;

  streetAddresstxt: Locator;

  citytxt: Locator;

  stateDD: Locator;

  postalCodetxt: Locator;

  contactFirstnametxt: Locator;

  contactLastnametxt: Locator;

  emailAddresstxt: Locator;

  phoneNumbertxt: Locator;

  createAccountBtn: Locator;

// Customer Successfully Created ok

  constructor(page: Page) {

    this.page = page;

    this.liquorLicensetxt = page.locator('//input[@id="0"]')

    this.corporateNametxt = page.locator('//input[@id="1"]')

    this.businessNametxt = page.locator('//input[@id="2"]')

    this.onOroffpremiseDD = page.locator('//div[text()="On or Off Premise"]')
  
    this.streetAddresstxt = page.locator('//input[@id="4"]')

    this.citytxt = page.locator('//input[@id="5"]')

    this.stateDD = page.locator('//div[text()="State"]')

    this.postalCodetxt = page.locator('//input[@id="7"]')

    this.contactFirstnametxt = page.locator('//input[@id="8"]')

    this.contactLastnametxt = page.locator('//input[@id="9"]')

    this.emailAddresstxt = page.locator('//input[@id="10"]')

    this.phoneNumbertxt = page.locator('//input[@id="11"]')

    this.createAccountBtn = page.locator('//button[@aria-label="Create Account"]')

  }

  async navigate() {
    await this.page.goto('/contact');
  }

  // Register a new user with the provided details
  async registerUser(liquorLicense: string, 
    corporateName: string, 
    businessName: string, 
    onOroffpremise: string, 
    streetAddress: string, 
    city: string, 
    state:string, 
    postalCode: string, 
    contactFirstname: string,
    contactLastname: string, 
    emailAddress: string, 
    phoneNumber: string,
  ): Promise<void>{

    clickAndFill(this.page, this.liquorLicensetxt, this.liquorLicensetxt, liquorLicense, 'Liquor License');
    clickAndFill(this.page, this.corporateNametxt, this.corporateNametxt, corporateName, 'Corporate Name');
    clickAndFill(this.page, this.businessNametxt, this.businessNametxt, businessName, 'Business Name');
    
    await this.onOroffpremiseDD.click(); // Click to open the dropdown
    await this.page.locator(`text=${onOroffpremise}`).click(); // Select the option from the dropdown

    clickAndFill(this.page, this.streetAddresstxt, this.streetAddresstxt, streetAddress, 'Street Address');
    clickAndFill(this.page, this.citytxt, this.citytxt, city, 'City');
    await this.stateDD.click(); // Click to open the dropdown
    await this.page.locator(`text=${state}`).click(); // Select the state from the dropdown

    clickAndFill(this.page, this.postalCodetxt, this.postalCodetxt, postalCode, 'Postal Code');
    clickAndFill(this.page, this.contactFirstnametxt, this.contactFirstnametxt, contactFirstname, 'Contact First Name');
    clickAndFill(this.page, this.contactLastnametxt, this.contactLastnametxt, contactLastname, 'Contact Last Name');
    clickAndFill(this.page, this.emailAddresstxt, this.emailAddresstxt, emailAddress, 'Email Address');
    clickAndFill(this.page, this.phoneNumbertxt, this.phoneNumbertxt, phoneNumber, 'Phone Number');
    await this.createAccountBtn.click()
  }

 // Verify alert dialog and accept it
async verifyAndAcceptAlert(expectedAlertText: string){

  let alertHandled = false;

  this.page.on('dialog', async dialog => {

  console.log(`Alert dialog displayed with type: ${dialog.type} and message: "${dialog.message}"`);

  expect(dialog.type).toBe('alert');

  expect(dialog.message).toBe(expectedAlertText);

  await dialog.accept();

  alertHandled = true;

 });
}
}

export default RegistrationPage;