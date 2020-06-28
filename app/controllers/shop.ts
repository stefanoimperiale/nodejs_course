import {Request, Response} from "express";
import Product from "../models/product";



const getProducts = async (req: Request, res: Response) => {
    const products = await Product.fetchAll();
    res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
    });
}

const getIndex = async (req: Request, res: Response) => {
    const products = await Product.fetchAll();
    res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
    });
}

const getCart = (req: Request, res: Response) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
    });
}

const getCheckout = (req: Request, res: Response) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
}

const getOrders = (req: Request, res: Response) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
    });
}

export {
    getIndex,
    getProducts,
    getCart,
    getCheckout,
    getOrders
};
