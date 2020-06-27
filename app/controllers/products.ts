import {Request, Response} from "express";
import Product from "../models/product";

const getAddProduct = (req: Request, res: Response) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
}

const postAddProduct = async (req: Request<any, any, Product>, res: Response) => {
    const product = new Product(req.body.title);
    await product.save();
    res.redirect('/');
}

const getProducts = async (req: Request, res: Response) => {
    const products = await Product.fetchAll();
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
    });
}

export {
    getAddProduct,
    postAddProduct,
    getProducts,
};
