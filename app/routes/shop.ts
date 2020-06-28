import express, {Router} from "express";
import {getCart, getCheckout, getIndex, getOrders, getProduct, getProducts, postCart} from "../controllers/shop"

const router: Router = express.Router();

router.get('/', getIndex);

router.get('/products', getProducts)

router.get('/products/:productId', getProduct)

router.get('/cart', getCart)

router.post('/cart', postCart);

router.get('/orders', getOrders);

router.get('/checkout', getCheckout)


export default router;
