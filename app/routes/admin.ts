import {NextFunction, Request, Response, Router} from "express";

import path from "path";

import express from 'express';

import rootDir from '../helpers/path';
import {Product} from "../types/types";

const router: Router = express.Router();
const products: Product[] = [];

router.get('/add-product', (req: Request, res: Response, next: NextFunction) => {
    res.render('add-product', {pageTitle: 'Add Product', path:'/admin/add-product'})
});

router.post('/add-product', (req: Request, res: Response, next: NextFunction) => {
    products.push({title: req.body.title});
    res.redirect('/');
});

export {
    router,
    products
};

