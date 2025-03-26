import { test, expect } from "@playwright/test"
import BlogPage from "../pages/blog.page";

test.describe('Blog Test', () => {
    let blogpage: BlogPage;

    test('Verify recent post couont  and verify the length of each item', async ({ page }) => {
        blogpage = new BlogPage(page);
        // Go to blog
        await blogpage.navigate();

        // get the recent post list elements
        const recentPostList = blogpage.recentPostsList;

        // loop through the list and assert the char lenght > 
        for (const el of await recentPostList.elementHandles()) {
            console.log((await el.textContent())?.trim()?.length)
            expect((await el.textContent())?.trim()?.length).toBeGreaterThan(10)
        }

        // assert the total length = 5
        expect(await recentPostList.count()).toEqual(5);

    })

})
