import { Page, Locator, expect } from '@playwright/test';

/**
 * @param page The Playwright Page object.
 * @param displayElementLocator The locator for the element to click to reveal/enable the input.
 * @param inputElementLocator The locator for the input field itself (which becomes editable).
 * @param text The text to fill into the input field.
 * @param fieldName A descriptive name for logging purposes.
 */
export async function clickAndFill(
    page: Page, 
    displayElementLocator: Locator,
    inputElementLocator: Locator,
    text: string,
    fieldName: string
): Promise<void> {

    // Ensure the display element is visible and then click it
    await expect(displayElementLocator).toBeVisible();
    await displayElementLocator.click();
    console.log(`Clicked display element for ${fieldName}.`);

    // Wait for the input field to become visible/editable
    await expect(inputElementLocator).toBeVisible();
    await expect(inputElementLocator).toBeEditable(); // Ensure it's ready for input

    // Fill the text
    await inputElementLocator.fill(text);
    console.log(`Entered ${fieldName}: ${text}`);
}