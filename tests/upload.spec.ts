import { test, expect } from "@playwright/test"
import path from "node:path"

test.describe('Upload Test', () => {

    test('Verify upload file', async ({ page }) => {
        // Go to blog
        await page.goto('https://practice.sdetunicorns.com/cart/');

        //provide the file path
        const filepath = path.join(__dirname, '../data/3mb-file.pdf');

        //upload the test file
        await page.setInputFiles('input#upfile_1', filepath);

        // click on file upload
        await page.locator('input#upload_1').click();

        // Hardcoded wait
        // await page.waitForTimeout(5000);

        // Conditional wait
        // page.locator('#wfu_messageblock_header_1_1').waitFor(); // default wait 30 sec
        // page.locator('#wfu_messageblock_header_1_1')
        // .waitFor({state: 'visible', timeout: 10000}); //  condition based wait

        // Assert file is uploaded [assertion wait]
        await expect(page.locator('#wfu_messageblock_header_1_1')).toContainText("uploaded successfully", {timeout:10000});

    })

    test('Verify upload  with Dom Manipulation', async ({ page }) => {
        // Go to blog
        await page.goto('https://practice.sdetunicorns.com/cart/');

        //provide the file path
        const filepath = path.join(__dirname, '../data/logotitle.png');


        // Dom Manipulation
        await page.evaluate(() => {
            const selector = document.querySelector('input#upfile_1');
            if (selector) {
                selector.className = '';
            }
        })

        //upload the test file
        await page.setInputFiles('input#upfile_1', filepath);

        // click on file upload
        await page.locator('input#upload_1').click();

        // Assert file is uploaded
        await expect(page.locator('#wfu_messageblock_header_1_1')).toContainText("uploaded successfully");

    })

})