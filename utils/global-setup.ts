import { chromium, FullConfig } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const baseUrl = process.env.BASE_URL!;
    const username = process.env.USERNAME!;
    const password = process.env.PASSWORD!;

    await page.goto(baseUrl);
    await page.context().storageState({ path: 'notLoggedInState.json' });

    // login
    await page.locator('#username').fill(username);
    await page.locator('#password').fill(password);
    await page.locator('[value="Log in"]').click();

    // save signed-in state to 'loggedInState.json'
    await page.context().storageState({ path: 'loggedInState.json' });
    await browser.close();
}

export default globalSetup;
