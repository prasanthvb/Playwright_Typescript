import { test, expect } from '@playwright/test'

test.describe('Contact Test', () => {

  test('Fill contact form and verify success message', async ({ page }) => {

    //open contact page
    await page.goto('https://practice.sdetunicorns.com/contact/');

    // Fill in the form
    await page.locator('.contact-name input').fill("Test Name")
    await page.locator('.contact-email input').fill("Test@mail.com")
    await page.locator('.contact-phone input').fill("1325476980")
    await page.locator('.contact-message textarea').fill("This is test")

    // click on submit
    await page.locator('button[type=submit]').click()

    // Verify success message
    const successMessage = page.locator('div[role="alert"]')
    await expect(successMessage).toHaveText('Thanks for contacting us! We will be in touch with you shortly')

  })
})
