const request = require('supertest');
const app = require('../app');
const { dataRequest } = require('../mockData');

describe('app', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should export the express app correctly', () => {
    expect(app).toBeTruthy();
  });

  describe('GET /', () => {
    it('should respond with Hello world', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Hello world');
    });

    it('should respond to the GET method with 200', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('GET /api/users', () => {
    it('should respond with data from GitHub API', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
      expect(response.body.message[0].login).toEqual(dataRequest[0].login);
    });

    it('should handle errors', async () => {
      const mockError = { response: { status: 404, data: { message: "Not Found" } } };
      const response = await request(app).get('/api/usersSS');
      expect(response.status).toBe(mockError.response.status);
      expect(response.body).toEqual({ message: mockError.response.data.message });
    });
  });

  describe('GET /api/users/:username/details', () => {
    it('should respond with user details from GitHub API', async () => {
      const response = await request(app).get('/api/users/PaivaGabrielB/details');
      expect(response.status).toBe(200);
      expect(response.body.message.login).toEqual("PaivaGabrielB");
    });

    it('should handle errors', async () => {
      const mockError = { response: { status: 404, data: { message: "Not Found" } } };
      const response = await request(app).get('/api/userSS/PaivaGabrielB/details');
      expect(response.status).toBe(mockError.response.status);
      expect(response.body).toEqual({ message: mockError.response.data.message });
    });
  });

  describe('GET /api/users/:username/repos', () => {
    it('should respond with user repos from GitHub API', async () => {
      const response = await request(app).get('/api/users/PaivaGabrielB/repos');
      expect(response.status).toBe(200);
      expect(response.body.message[0].id).toEqual(569019308);
    });

    it('should handle errors', async () => {
      const mockError = { response: { status: 404, data: { message: "Not Found" } } };

      const response = await request(app).get('/api/userSSSSSs/PaivaGabrielB/repos');
      expect(response.status).toBe(mockError.response.status);
      expect(response.body).toEqual({ message: mockError.response.data.message });
    });
  });
});
