const { test, expect } = require('@playwright/test');

test.describe('API Automation Assignment - Reqres.in', () => {
  const baseURL = 'https://reqres.in/api';
  const API_KEY = 'pro_27cc66a86e552953ea476bb238ac39dcae13fd5da63a900b';
  const COLLECTION = 'users';
  let userId;

  test('Create, Fetch, and Update User', async ({ request }) => {

    const createResponse = await request.post(`${baseURL}/collections/${COLLECTION}/records`, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
      },
      data: {
        data: {
          name: 'John',
          job: 'QA Engineer'
        }
      }
    });
    expect([200, 201]).toContain(createResponse.status());

    const createData = await createResponse.json();
    expect(createData.data).toBeDefined();
    expect(createData.data.id).toBeDefined();
    userId = createData.data.id;
    console.log(`Created user successfully with ID: ${userId}`);

    const getResponse = await request.get(`${baseURL}/collections/${COLLECTION}/records/${userId}`, {
      headers: {
        'x-api-key': API_KEY
      }
    });

    expect(getResponse.status()).toBe(200);

    const getData = await getResponse.json();
    expect(getData.data.data.name).toBe('John');
    expect(getData.data.data.job).toBe('QA Engineer');
    console.log(`Fetched user details successfully: ${getData.data.data.name} - ${getData.data.data.job}`);

    const updateResponse = await request.put(`${baseURL}/collections/${COLLECTION}/records/${userId}`, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
      },
      data: {
        data: {
          name: 'John Updated',
          job: 'Senior QA'
        }
      }
    });

    expect(updateResponse.status()).toBe(200);

    const updateData = await updateResponse.json();
    expect(updateData.data.data.name).toBe('John Updated');
    expect(updateData.data.data.job).toBe('Senior QA');
    console.log(`Updated user name successfully to: ${updateData.data.data.name}`);
  });
});