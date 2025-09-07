import { faker } from '@faker-js/faker';
/**
 * This module provides a base payload structure and a function to generate
 * a new payload with unique, faker-generated data for testing purposes.
 */
export const basePayload = {
    "accountName": "",
    "legalOwnerName": "",
    "distributionChannel": {
        "Code": "20",
        "Name": "Off Premise"
    },
    "Address": [
        {
            "addressType": "Shipping",
            "addressLine1": "",
            "city": "",
            "county": "",
            "state": "",
            "postalCode": "",
            "country": "US"
        }
    ],
    "contactFirstName": "",
    "contactLastName": "",
    "primaryEmail": "",
    "phone": "",
    "alcoholLicenseNumber": "",
    "externalSiteId": "" 
};

/**
 * Generates a new payload with unique, faker-generated data for specified fields.
 */
export function generatePayloadWithFakerData(): typeof basePayload {
    const newPayload = JSON.parse(JSON.stringify(basePayload));

    // Generate random data using faker
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    // Assign faker data to the cloned payload
    newPayload.accountName = faker.company.name();
    newPayload.legalOwnerName = faker.company.name() + ' LLC';
    newPayload.Address[0].addressLine1 = faker.location.streetAddress();
    newPayload.Address[0].city = faker.location.city();
    newPayload.Address[0].county = faker.location.county();
    newPayload.Address[0].state = faker.location.state({ abbreviated: true });
    newPayload.Address[0].postalCode = faker.location.zipCode();
    newPayload.contactFirstName = firstName;
    newPayload.contactLastName = lastName;
    newPayload.primaryEmail = faker.internet.email({ firstName, lastName });
    newPayload.phone = faker.phone.number({ style: 'national' });
    newPayload.alcoholLicenseNumber = faker.string.alphanumeric({ length: 9, casing: 'upper' });

    return newPayload;
}
