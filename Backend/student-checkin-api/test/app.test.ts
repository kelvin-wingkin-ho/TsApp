import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js'

describe('GET /', () => {
    it('should return 200 OK and the correct JSON body', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'API is running smoothly'});
    })
})
