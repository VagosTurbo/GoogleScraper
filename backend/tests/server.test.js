const request = require('supertest');
const { app } = require('../server'); // assuming your Express app is in server.js
const axios = require('axios');

// Mocking axios to simulate API responses without making actual HTTP requests
jest.mock('axios');

describe('POST /search', () => {
  it('should return search results when query is provided', async () => {
    // Simulating a successful response from SerpApi
    axios.get.mockResolvedValue({
      data: {
        organic_results: [
          {
            title: 'Test Title 1',
            link: 'https://example.com/1',
            snippet: 'This is a test snippet 1.'
          },
          {
            title: 'Test Title 2',
            link: 'https://example.com/2',
            snippet: 'This is a test snippet 2.'
          }
        ]
      }
    });

    const response = await request(app)
      .post('/search')
      .send({ query: 'test' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        title: 'Test Title 1',
        link: 'https://example.com/1',
        snippet: 'This is a test snippet 1.'
      },
      {
        title: 'Test Title 2',
        link: 'https://example.com/2',
        snippet: 'This is a test snippet 2.'
      }
    ]);
  });

  it('should return 400 if query is missing', async () => {
    const response = await request(app)
      .post('/search')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Query cannot be empty');
  });

  it('should return 400 if query is empty', async () => {
    const response = await request(app)
      .post('/search')
      .send({ query: ' ' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Query cannot be empty');
  });

  it('should return 400 if query is too long', async () => {
    const longQuery = 'a'.repeat(1001);
    const response = await request(app)
      .post('/search')
      .send({ query: longQuery });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Query is too long');
  });

  it('should return 500 if there is an error in the search request', async () => {
    // Simulating an error from the axios call
    axios.get.mockRejectedValue(new Error('API request failed'));

    const response = await request(app)
      .post('/search')
      .send({ query: 'test' });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Failed to fetch search results');
  });
});
