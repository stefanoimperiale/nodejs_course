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

const admin: Router = express.Router();

admin.get('/add-product', getAddProduct);

admin.get('/products', getProducts);

admin.post('/add-product', postAddProduct);

admin.get('/edit-product/:productId', getEditProduct)

admin.post('/edit-product', postEditProduct);

admin.post('/delete-product', postDeleteProduct);

export default admin;


