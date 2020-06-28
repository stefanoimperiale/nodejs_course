import {Request, Response} from "express";
import Product from "../models/product";
import Cart from "../models/cart";


export const getProducts = async (req: Request, res: Response) => {
    const [rows, fieldData] = await Product.fetchAll();
    res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'All Products',
        path: '/products',
    });
}

export const getProduct = async (req: Request<{ productId: string }>, res: Response) => {
    const productId = +req.params.productId;
    try {
        const [product] = await Product.findById(productId);
        res.render('shop/product-detail', {
            pageTitle: product[0].title,
            path: '/products',
            product: product[0]
        });
    }catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
    }
}

export const getIndex = async (req: Request, res: Response) => {
    const [rows, fieldData] = await Product.fetchAll();
    res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/',
    });
}

export const getCart = async (req: Request, res: Response) => {
    const cart = await Cart.getCart();
    const [rows, fieldData] = await Product.fetchAll();
    const cartProducts = [];
    for (const product of rows) {
        const cartProductData = cart?.products.find(prod => prod.id === product.id);
        if (cartProductData) {
            cartProducts?.push({ productData: product, qty: cartProductData.qty });
        }
    }

    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts,
    });
}

export const postCartDeleteProduct = async (req: Request<any, any, {productId: string}>, res: Response) => {
    const prodId = req.body.productId;
    const product = await Product.findById(+prodId);
    if (!product) throw new Error(`product with id ${prodId} not found`);
    Cart.deleteProduct(+prodId, product.price);
    res.redirect('/cart');
}

export const postCart = async (req: Request<any, any, { productId: string }>, res: Response) => {
    const prodId = +req.body.productId;
    const product = await Product.findById(prodId);

    if (!product) throw new Error('Product not found');

    Cart.addProduct(prodId, product.price);
    res.redirect('/cart');
}

export const getCheckout = (req: Request, res: Response) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
}

export const getOrders = (req: Request, res: Response) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
    });
}
