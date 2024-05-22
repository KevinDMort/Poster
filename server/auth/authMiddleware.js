import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';
import { getUserByEmail, getUserByUsername, addUser } from '../db/users.js'


const secret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

export const authMiddleware = expressjwt({
  algorithms: ['HS256'],
  credentialsRequired: false,
  secret,
});

export async function handleLogin(req, res) {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user || user.password !== password) {
      res.sendStatus(401);
    } else {
      const claims = { sub: user.id, email: user.email };
      const token = jwt.sign(claims, secret);
      res.json({ token });  
    }
  }

  export async function handleSignup(req, res) {
    const { username, email, password, location, description } = req.body;
    const emailTaken = await getUserByEmail(email);
    const usernameTaken = await getUserByUsername(username);
    if (emailTaken || usernameTaken) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      const newUser = await addUser(username, password, email, location, description);
      const claims = { sub: newUser.id, email: newUser.email };
      const token = jwt.sign(claims, secret);
      res.json({ token });
    }
  }

  export function decodeToken(token) {
    return jwt.verify(token, secret);
  }