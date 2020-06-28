import {Request, Response} from "express";
import Product from "../models/product";
import Cart from "../models/cart";


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

const getProduct = async (req: Request<{ productId: string }>, res: Response) => {
    const productId = +req.params.productId;
    const product = await Product.findById(productId);
    res.render('shop/product-detail', {
        pageTitle: product?.title,
        path: '/products',
        product
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

const postCart = async (req: Request<any, any, { productId: string }>, res: Response) => {
    const prodId = +req.body.productId;
    const product = await Product.findById(prodId);

    if (!product) throw new Error('Product not found');

    Cart.addProduct(prodId, product.price);
    res.redirect('/cart');
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
    getProduct,
    getCart,
    postCart,
    getCheckout,
    getOrders,
};
