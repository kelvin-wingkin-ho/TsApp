import jwt from 'jsonwebtoken';
import type { User } from '../types/types.js';

const ACCESS_SECRET = process.env.ACCESS_SECRET || 'access_secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh_secret';

export const generateAccessToken = (user: User) => {
    const {password, ...userExcludePwd} = user;
    return jwt.sign(userExcludePwd, ACCESS_SECRET, { expiresIn: '15m'});
};

export const generateRefreshToken = (user: User) => {
    const {password, ...userExcludePwd} = user;
    return jwt.sign(userExcludePwd, REFRESH_SECRET, { expiresIn: '7d'});
}