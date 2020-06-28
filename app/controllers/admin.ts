import {Request, Response} from "express";
import Product from "../models/product";

const getAddProduct = (req: Request, res: Response) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
}

const postAddProduct = async (req: Request<any, any, Product>, res: Response) => {
    const {title, imageUrl, price, description} = req.body;
    const product = new Product(title, imageUrl, description, +price);
    await product.save();
    res.redirect('/');
}

const getProducts = async (req: Request, res: Response) => {
    const products = await Product.fetchAll();
    res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
    });
}

export {
    getAddProduct,
    postAddProduct,
    getProducts
}
