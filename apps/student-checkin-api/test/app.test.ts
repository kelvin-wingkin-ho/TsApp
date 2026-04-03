import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app, { mockUser} from '../src/app.js'

describe('Test API', () => {
    it('Get / should return 200 OK and the correct JSON body', async () => {
        const response = await request(app).get('/').expect(200);
        expect(response.body).toEqual({ message: 'API is running smoothly'});
    });

    it('Post ')

    it('Post /token should return 200 OK with JSON Web token', async () => {
        const response = await request(app)
            .post('/token')
            .send(mockUser)
            .expect(200);
        expect(response.body.accessToken).toBeDefined();
    })
})
