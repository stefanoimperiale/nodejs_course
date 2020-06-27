import {NextFunction, Request, Response, Router} from "express";

import path from "path";

import express from 'express';

import rootDir from '../helpers/path';

const router: Router = express.Router();

router.get('/add-product', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
});

router.post('/add-product', (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    res.redirect('/');
});

export default router;
