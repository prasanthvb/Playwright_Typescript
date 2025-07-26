import { test, expect } from "@playwright/test";
import RegistrationPage from "../pages/new-account.page";

test.describe('Register a new user account', () => {
    let registrationPage: RegistrationPage;
    test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page);
        //open the registration page
        // await registrationPage.navigate();
    });
    

    test('Open home page and verify title', async ({ page }) => {
        
       registrationPage.registerUser(
            '123456789',
            'Test Corp',
            'Test Business',
            'Off Premise',
            '123 Test St',
            'Test City',
            'Texas',
            '12345',
            'John',
            'Doe',
            'John.doe@gmail.com',
            '1234567890'
        );
            
    });
});
