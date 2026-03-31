import express from 'express';
import type { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

app.use(cors());
app.use(express.json());

// Mock user (replace with DB in real app)
const mockUser = {
  email: 'test@example.com',
  password: '123456', // plain text for demo only
}

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API is running smoothly' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required'});
  }

  // Check credentials
  if (email !== mockUser.email || password !== mockUser.password) {
    return res.status(401).json({ message: 'Invalid email or password'})
  }

  // Success
  res.json({
    message: 'Login successful',
    user: { email}
  });

})

export default app;
