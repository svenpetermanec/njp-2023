import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, NextFunction, Response } from 'express';

dotenv.config();

interface jwtPayload {
    user: {
        id: number;
    };
}

export const auth = (req: any, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) res.status(401).json({ status: 'Authorization denied' });

    try {
        const { user } = jwt.verify(
            token!,
            process.env.jwtSecret!
        ) as jwtPayload;

        req.id = user.id;

        next();
    } catch (err) {}
};
