import { test, expect, request } from '@playwright/test';

let authToken: string;

test('POST API to get auth token', async ({ request }) => {
    const apiUrl = 'https://your-api-endpoint.com/auth';
    const payload = {
        username: 'your_username',
        password: 'your_password'
    };

    const response = await request.post(apiUrl, {
        data: payload,
        headers: {
            'Accept': 'application/json'     
        }
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const data = await response.json();
    authToken = data.token; // Adjust according to your API response structure
    expect(authToken).toBeTruthy();
});

test('GET API with auth token', { tag: '@api' }, async ({ request }) => {
    const apiUrl = 'https://your-api-endpoint.com/data';

    const response = await request.get(apiUrl, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Accept': 'application/json'
        }
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);
});