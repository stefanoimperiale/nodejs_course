import {Request, Response} from "express";
import Product from "../models/product.model";
import { ObjectId } from "mongodb";

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.fetchAll();
    res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
    });
}


export const getProduct = async (req: Request<{ productId: string }>, res: Response) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        res.render('shop/product-detail', {
            pageTitle: product!.title,
            path: '/products',
            product
        });
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
    }
}

export const getIndex = async (req: Request, res: Response) => {
    const products = await Product.fetchAll();
    res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
    });
}

export const getCart = async (req: Request, res: Response) => {
    const cartProducts = await req.user.getCart();
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts,
    });
}

export const postCartDeleteProduct = async (req: Request<any, any, { productId: string }>, res: Response) => {
    const prodId = req.body.productId;
    await req.user.deleteItemFromCart(new ObjectId(prodId));
    res.redirect('/cart');
}

export const postCart = async (req: Request<any, any, { productId: string }>, res: Response) => {
    const prodId = req.body.productId;
    const product = await Product.findById(prodId);
    await req.user.addToCart(product!);
    res.redirect('/cart');
}

export const postOrder = async (req: Request, res: Response) => {
    await req.user.addOrder();
    res.redirect('/orders')
}

export const getCheckout = (req: Request, res: Response) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
}

export const getOrders = async (req: Request, res: Response) => {
    const orders = await req.user.getOrders();
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
        orders
    });
}
