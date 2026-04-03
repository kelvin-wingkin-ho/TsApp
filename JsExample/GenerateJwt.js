/**
 * A small program to generate JWT.
 */
import jwt from 'jsonwebtoken';

const payload = {
    userId: 123,
    username: 'john_doe'
}

const secret = 'your_secret_key'
const token = jwt.sign(payload, secret, {
    expiresIn: '1h'
});

console.log(token);