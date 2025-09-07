import { test, expect } from '@playwright/test';
import * as dotenv from "dotenv";
import { basePayload, generatePayloadWithFakerData } from '../utils/api';
let authToken: string;
dotenv.config();

test.describe('API Tests', () => {
    test.beforeEach('POST API to get auth token', async ({ request }) => {
        const apiUrl = 'https://sgwsteam--proofdev.sandbox.my.salesforce.com/services/oauth2/token';
        const form = {
            grant_type: process.env.GRANT_TYPE || '',
            username: process.env.USER_NAME_API || '',
            password: process.env.PASSWORD_API || '',
            client_id: process.env.CLIENTID || '',
            client_secret: process.env.SECRET_KEY || ''
        };

        const response = await request.post(apiUrl, {
            headers: {
                'Accept': '*/*'
            },
            form
        });
        expect(response.status()).toBe(200);
        const res = await response.json();
        authToken = res.access_token;
        expect(authToken).toBeTruthy();
    });

    // test('To verify account is created successfully for valid details', async ({ request }) => {
    //     const apiUrl = 'https://sgwsteam--proofdev.sandbox.my.salesforce.com/services/apexrest/GetGlobalID';
    //     const payload = generatePayloadWithFakerData();
    //     console.log('Payload:', payload);
    //     const response = await request.post(apiUrl, {
    //         headers: {
    //             'Authorization': `Bearer ${authToken}`,
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         data: payload
    //     });
    //     let data: any;
    //     const contentType = response.headers()['content-type'] || '';
    //     if (contentType.includes('application/json')) {
    //         data = await response.json();
    //     } else {
    //         data = await response.text();
    //     }
    //     console.log('Positive Test Response:', data);
    //     expect(response.ok()).toBeTruthy();
    //     expect(response.status()).toBe(200);

    //     // if (!data.customerID) {
    //     //     console.error('customerID not found in response:', data);
    //     // }
    //     // expect(data.customerID).toBeDefined();
    // });
     test('To verify account is created successfully for valid details', { tag: '@api-positive' }, async ({ request }) => {
        const apiUrl = 'https://sgwsteam--proofdev.sandbox.my.salesforce.com/services/apexrest/GetGlobalID';
        const payload = generatePayloadWithFakerData();

        // FIX: The API requires an External Site ID and unique Legal Owner Name.
        const timestamp = new Date().getTime().toString();
        payload.externalSiteId = timestamp;
        payload.legalOwnerName = payload.legalOwnerName + ' ' + timestamp;

        console.log('Final Payload:', payload);

        let response;
        try {
            response = await request.post(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: payload
            });

            console.log('Positive Test Response Status:', response.status());

            if (response.ok()) {
                const data = await response.json();
                console.log('Positive Test Response Body:', data);
                expect(response.status()).toBe(200);
                expect(data.globalId).toBeDefined();
            } else {
                // If the response is not OK, log the body as plain text to avoid the SyntaxError
                console.error('API call failed with status:', response.status());
                console.error('Response Body:', await response.text());
                // This line will intentionally fail the test with a descriptive message
                throw new Error(`API call failed with status ${response.status()}`);
            }

        } catch (error) {
            console.error('API Call Failed:', error.message);
            // We can re-throw the original error to fail the test.
            throw error;
        }
    });


  //   test('❌ Invalid token should return 401', async ({ request }) => {
  //   const apiUrl = 'https://sgwsteam--proofdev.sandbox.my.salesforce.com/services/apexrest/GetGlobalID';
  //   const payload = generatePayloadWithFakerData();
  //   const response = await request.post(apiUrl, {
  //     headers: {
  //       'Authorization': `Bearer INVALID_TOKEN`,
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     data: payload
  //   });
  //   expect(response.status()).toBe(401);
  // });

  // test('❌ Missing mandatory fields should return 400', async ({ request }) => {
  //   const apiUrl = 'https://sgwsteam--proofdev.sandbox.my.salesforce.com/services/apexrest/GetGlobalID';
  //   const invalidPayload = { ...basePayload }; 
  //   const response = await request.post(apiUrl, {
  //     headers: {
  //       'Authorization': `Bearer ${authToken}`,
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     data: invalidPayload
  //   });
  //   expect([400, 422]).toContain(response.status());
  // });

  // test('❌ Invalid email format should fail validation', async ({ request }) => {
  //   const apiUrl = 'https://sgwsteam--proofdev.sandbox.my.salesforce.com/services/apexrest/GetGlobalID';
  //   const payload = generatePayloadWithFakerData();
  //   payload.primaryEmail = "invalidEmailFormat";
  //   const response = await request.post(apiUrl, {
  //     headers: {
  //       'Authorization': `Bearer ${authToken}`,
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     data: payload
  //   });
  //   expect([400, 422]).toContain(response.status());
  // });

  // test('❌ Invalid postal code should return error', async ({ request }) => {
  //   const apiUrl = 'https://sgwsteam--proofdev.sandbox.my.salesforce.com/services/apexrest/GetGlobalID';
  //   const payload = generatePayloadWithFakerData();
  //   payload.Address[0].postalCode = "INVALID";
  //   const response = await request.post(apiUrl, {
  //     headers: {
  //       'Authorization': `Bearer ${authToken}`,
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     data: payload
  //   });
  //   expect([400, 422]).toContain(response.status());
  // });

  // test('❌ Duplicate account name should return conflict (409)', async ({ request }) => {
  //   const apiUrl = 'https://sgwsteam--proofdev.sandbox.my.salesforce.com/services/apexrest/GetGlobalID';
  //   const payload = generatePayloadWithFakerData();

  //   // First creation
  //   const response1 = await request.post(apiUrl, {
  //     headers: {
  //       'Authorization': `Bearer ${authToken}`,
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     data: payload
  //   });
  //   expect(response1.status()).toBe(200);

  //   // Second creation with same account
  //   const response2 = await request.post(apiUrl, {
  //     headers: {
  //       'Authorization': `Bearer ${authToken}`,
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     data: payload
  //   });
  //   expect([409, 400]).toContain(response2.status());
  // });
});