import express, {Router} from "express";
import {
    getCart,
    getCheckout,
    getIndex,
    getOrders,
    getProduct,
    getProducts,
    postCart,
    postCartDeleteProduct, postOrder
} from "../controllers/shop"

const shop: Router = express.Router();

shop.get('/', getIndex);

shop.get('/products', getProducts)

shop.get('/products/:productId', getProduct)

shop.get('/cart', getCart)

shop.post('/cart', postCart);

shop.post('/cart-delete-item', postCartDeleteProduct);

shop.post('/create-order', postOrder);

shop.get('/orders', getOrders);

shop.get('/checkout', getCheckout)


export default shop;
