import {Router} from "express";
import express from 'express';
import {getAddProduct, getProducts, postAddProduct} from "../controllers/admin"

const router: Router = express.Router();

router.get('/add-product', getAddProduct);

router.post('/add-product', postAddProduct);

router.get('/products', getProducts);

export default router;


