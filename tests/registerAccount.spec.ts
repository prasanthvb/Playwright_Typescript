import { test, expect } from "@playwright/test";
import RegistrationPage from "../pages/new-account.page";
import data from "../data/register-user-data.json";

test.describe('Register a new user account', () => {
    let registrationPage: RegistrationPage;
    test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page);
        //open the registration page
        // await registrationPage.navigate();
    });
    

    test('Open home page and verify title', async ({ page }) => {
        const myAccountPage = await registrationPage.registerUser(
        data.liquorLicense,
        data.corporateName,
        data.businessName,
        data.premise,
        data.streetAddress,
        data.city,
        data.state,
        data.postalCode,
        data.fistName,
        data.lastName,
        data.email,
        data.telephoneNumber
      );
    
      await registrationPage.verifyAndAcceptAlert('Customer Successfully Created ok');
      console.log('Account created successfully');
            
    });
});
