import { test, expect } from "@playwright/test";
import HomePage from "../pages/home.page";

test.describe('Home', () => {
    let homepage: HomePage;

    test.beforeEach(async ({ page }) => {
        homepage = new HomePage(page);
        //open the url
        await homepage.navigate();
    })

    test('Open home page and verify title', async ({ page }) => {
        //verify title
        await expect(page).toHaveTitle("Practice TE-Commerce Site – SDET Unicorns");
    });

    test.skip('Open About page and verify title', async ({ page }) => {
        homepage = new HomePage(page);
        //open the url
        await page.goto('https://practice.sdetunicorns.com/about')
        //verify title
        await expect(page).toHaveTitle("About – Practice E-Commerce Site");
    });

    test('Click get started using CSS selector', async ({ page }) => {
        //click on get started [No await as it does not have any promise]
        //page.locator('#get-started').click();
        await homepage.getStartedBtn.click();

        //verify the URL has #get-started
        await expect(page).toHaveURL(/.*#get-started/);
    });

    test('Verify heading is visible by text selector', async () => {
        //find heading with text selector
        const headingText = homepage.headingText;

        //verify heading text is visible
        await expect(headingText).toBeVisible();
    });

    test('Verify home link is enabled using text and css selector', async () => {
        //find the home text
        //const hometext = await page.locator('#zak-primary-menu >> text=Home')  // Method 1
        //const hometext = page.locator('#zak-primary-menu:has-text("Home")') // Method 2

        const hometext = homepage.homeLink;

        // Verify home text is enabled
        await expect(hometext).toBeEnabled();
    })

    test('Verify search icon is visible using xpath selector', async () => {
        //find the search icon
        const searchIcon = homepage.searchIcon;

        // Verify search icon is visile
        await expect(searchIcon).toBeVisible();
    })


    test('Verify text of all nav links', async () => {
        const expectedLinks = [
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account",
        ];

        // //find the nav links
        // const navLinks = homepage.navLinks;

        // //print out all the links
        // for (const el of await navLinks.elementHandles()) {
        //     console.log(await el.textContent())
        // }

        // Verify nav links text
        // expect(await navLinks.allTextContents()).toEqual(expectedLinks);
        expect(await homepage.getNavLinksText()).toEqual(expectedLinks);
    })
});
