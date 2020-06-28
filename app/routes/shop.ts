import express, {Router} from "express";
import {getCart, getCheckout, getIndex, getOrders, getProducts} from "../controllers/shop"

const router: Router = express.Router();

router.get('/', getIndex);

router.get('/products', getProducts)

router.get('/cart', getCart)

router.get('/orders', getOrders);

router.get('/checkout', getCheckout)


export default router;
