import {Router} from "express";
import express from 'express';
import {
    getAddProduct,
    getEditProduct,
    getProducts,
    postAddProduct,
    postDeleteProduct,
    postEditProduct
} from "../controllers/admin"

const router: Router = express.Router();

router.get('/add-product', getAddProduct);

router.get('/products', getProducts);

router.post('/add-product', postAddProduct);

router.get('/edit-product/:productId', getEditProduct)

router.post('/edit-product', postEditProduct);

router.post('/delete-product', postDeleteProduct);

export default router;


