import {Request, Response} from "express";
import Product from "../models/product";
import Cart from "../models/cart";


export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll();
    res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
    });
}

export const getProduct = async (req: Request<{ productId: string }>, res: Response) => {
    const productId = +req.params.productId;
    try {
        const product = await Product.findByPk(productId);
        res.render('shop/product-detail', {
            // @ts-ignore
            pageTitle: product.title,
            path: '/products',
            product
        });
    }catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
    }
}

export const getIndex = async (req: Request, res: Response) => {
    const products = await Product.findAll();
    res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
    });
}

export const getCart = async (req: Request, res: Response) => {
    const cart = await req.user.getCart();
    const cartProducts = await cart.getProducts();
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts,
    });
}

export const postCartDeleteProduct = async (req: Request<any, any, {productId: string}>, res: Response) => {
    const prodId = req.body.productId;
    const cart = await req.user.getCart();
    const products = await cart.getProducts({where: {id: prodId}});
    if (products.length === 0) throw new Error(`product with id ${prodId} not found`);
    await products[0].cartItem.destroy();
    res.redirect('/cart');
}

export const postCart = async (req: Request<any, any, { productId: string }>, res: Response) => {
    const prodId = +req.body.productId;
    const cart = await req.user.getCart()
    const products = await cart.getProducts({where: {id: prodId}});
    let newQuantity = 1;

    if (products.length > 0) {
        const product = products[0];
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
    }
    const tableProduct = await Product.findByPk(prodId);
    await cart.addProduct(tableProduct, { through: { quantity: newQuantity}});
    res.redirect('/cart');
}

export const postOrder = async (req: Request, res: Response) => {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    const order = await req.user.createOrder();
    await order.addProducts(products.map(product => {
        product.orderItem = {
         quantity: product.cartItem.quantity
        }
        return product;
    }));
    await cart.setProducts(null);
    res.redirect('/orders')
}

export const getCheckout = (req: Request, res: Response) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
}

export const getOrders = async (req: Request, res: Response) => {
    const orders = await req.user.getOrders({include: ['products']});
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
        orders
    });
}
