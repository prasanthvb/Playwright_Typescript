import { test, expect } from "@playwright/test"

test.describe('Blog Test', () => {

    test('Verify recent post couont  and verify the length of each item', async ({ page }) => {
        // Go to blog
        await page.goto('https://practice.sdetunicorns.com/blog/')

        // get the recent post list elements
        const recentPostList = page.locator('#recent-posts-3 ul li')

        // loop through the list and assert the char lenght > 
        for (const el of await recentPostList.elementHandles()) {
            console.log((await el.textContent())?.trim()?.length)
            expect((await el.textContent())?.trim()?.length).toBeGreaterThan(10)
        }

        // assert the total length = 5
        expect(await recentPostList.count()).toEqual(5);
    
    })

})
