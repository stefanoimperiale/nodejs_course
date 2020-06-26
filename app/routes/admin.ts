import {NextFunction, Request, Response, Router} from "express";

import path from "path";

import express from 'express';

const router: Router = express.Router();

router.get('/product', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
});

router.post('/product', (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body)
    res.redirect('/');
});

export default router;
