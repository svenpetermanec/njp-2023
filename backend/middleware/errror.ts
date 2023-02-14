import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err.stack);
    res.status(500).send('Internal server error');
};

export const asyncErrorHandler =
    (fn: (req: Request, res: Response, next: NextFunction) => void) =>
    (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(fn(req, res, next)).catch(next);
    };
