import {Router} from "express";
import express from 'express';
import {getAddProduct, postAddProduct} from "../controllers/products"

const router: Router = express.Router();

router.get('/add-product', getAddProduct);

router.post('/add-product', postAddProduct);

export {
    router
};

